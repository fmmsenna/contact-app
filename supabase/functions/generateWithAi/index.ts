import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"; 

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')
const GIPHY_API_KEY = Deno.env.get('GIPHY_API_KEY')

const supabaseUrl = Deno.env.get("SUPABASE_URL");  
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

const groqUrl = "https://api.groq.com/openai/v1/chat/completions"
const giphyUrl = "https://api.giphy.com/v1/gifs/search"

const allowedOrigins = [
  "http://localhost:3000",
  "https://contact-app-taupe-sigma.vercel.app",
];

serve(async (req) => {
  //Handling CORS
  const origin = req.headers.get('origin');

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (!allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  

  //Checking Auth
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }

  try {
    // GROQ API call
    const groqResponse = await fetch(groqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `You are an assistant that generates the following information: 
            1- a name + last name: using characters from real sitcom series Friends, How I Met Your Mother, Suits, Billions or The Office. You choose, but it has to be real, don't invent;
            2- a random brazilian phone number in this format xx9xxxxxxxx - DO not use spaces;
            PS. Do not generate same names following each other.
            Return the result in JSON format like this: {"name": "", "phone_number": ""}
            `,
          },
        ],
      }),
    })

    const groqData = await groqResponse.json()
    const content = groqData.choices[0].message.content
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    const jsonString = jsonMatch[0]
    const result = JSON.parse(jsonString)

    // Giphy API call
    const params = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      q: result.name,
      limit: '1',
    })

    const giphyResponse = await fetch(`${giphyUrl}?${params.toString()}`)
    const giphyData = await giphyResponse.json()
    const giphyResponseUrl = giphyData.data[0].images.original.url

    // Combining the results
    const finalResult = {
      ...result,
      profile_url: giphyResponseUrl
    }

    return new Response(JSON.stringify(finalResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});