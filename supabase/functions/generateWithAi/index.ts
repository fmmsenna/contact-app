import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import supabase from "../../../src/supabase"

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')
const GIPHY_API_KEY = Deno.env.get('GIPHY_API_KEY')
const groqUrl = "https://api.groq.com/openai/v1/chat/completions"
const giphyUrl = "https://api.giphy.com/v1/gifs/search"

const allowedOrigins = ["http://localhost:3000", "https://contact-app-taupe-sigma.vercel.app"];

console.log("Function started")

// const origin = req.headers.get('origin');
  console.log(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://contact-app-taupe-sigma.vercel.app",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-client-info, apikey, Authorization",
  }


serve(async (req) => {

  console.log(`Received ${req.method} request`)


  //Handling CORS
  if (req.method === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      return new Response(null, {headers: corsHeaders});
    } else {
      return new Response(null, {
        status: 403,
        statusText: "Forbidden",
      });
    }
  }

  //Checking auth
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No authorization header' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
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

    if (allowedOrigins.includes(origin)) {
      return new Response(
        JSON.stringify(finalResult),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(null, {
        status: 403,
        statusText: "Forbidden",
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } })
    
  }
})
