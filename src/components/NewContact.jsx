import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "./SessionContext";
import Groq from "groq-sdk";

function NewContact() {
  const { session } = useContext(SessionContext);

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone_number: "",
    profile_url: "",
    contact_id: "",
  });
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(event) {
    setFormError(false);
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  }

  async function handleSubmitSupabase(e) {
    e.preventDefault();
    if (!contact.name || !contact.phone_number || !contact.profile_url) {
      setFormError((prevState) => !prevState);
      return;
    }

    setIsLoading((prevState) => !prevState);

    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: contact.name,
          phone_number: contact.phone_number,
          profile_url: contact.profile_url,
          customer_id: session.user.id,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      setFormError((prevState) => !prevState);
    }
    if (data) {
      setFormError(false);
      navigate("/contact-list");
    }

    setIsLoading((prevState) => !prevState);
  }

  //Using Fetch with GROQ Api
  async function handleGenerateWithAi() {
    const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(groqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `You are an assistant that generates the following information: 
            1- a name + last name: using characters from real sitcom series Friends, How I Met Your Mother, Suits, Billions or The Office. You choose, but it has to be real, don't invent;
            2- a random brazilian phone number in this format xx9xxxxxxxx - DO not use spaces;
            3- a profile picture url from a random giphy https://giphy.com/. You must triple-check if the URL is actually providing a real image.
            Return the result in JSON format like this: {"name": "", "phone_number": "", "profile_url": ""}
            `,
          },
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch[0];
    const result = JSON.parse(jsonString);

    setContact((prevContact) => ({
      ...prevContact,
      name: result.name,
      phone_number: result.phone_number,
      profile_url: result.profile_url,
    }));

    /* 
    Using GRONQ SDK 
    const groq = new Groq({
      apiKey: process.env.REACT_APP_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are an assistant that generates the following information: 
            1- a name + last name: using characters from real sitcom series Friends, How I Met Your Mother, Suits, Billions or The Office. You choose, but it has to be real, don't invent;
            2- a random brazilian phone number in this format xx9xxxxxxxx - DO not use spaces;
            3- a profile picture url from a random giphy https://giphy.com/. You must triple-check if the URL is actually providing a real image.
            Return the result in JSON format like this: \"name\": \"\", \"phone_number\": \"\", \"profile_url\": \"\"
            `,
        },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });
    const data = chatCompletion.choices[0]?.message?.content || "";
    const result = JSON.parse(data);
    setContact((prevContact) => ({
      ...prevContact,
      name: result.name,
      phone_number: result.phone_number,
      profile_url: result.profile_url,
    }));
    */
  }

  return (
    <div className="newContact--container">
      <form className="form--addNewContact" onSubmit={handleSubmitSupabase}>
        <h1 className="h1--login">New Contact</h1>
        <span>
          ✨
          <p className="ai-contact" onClick={handleGenerateWithAi}>
            Generate with AI
          </p>
        </span>
        <div className="inputWrap--addContact">
          <div className="input--element">
            <input
              id="name"
              type="text"
              name="name"
              placeholder=""
              autoComplete="off"
              value={contact.name}
              onChange={(event) => handleInputChange(event)}
            />
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="input--element">
            <input
              id="phone-input"
              placeholder="(  )    -    "
              type="number"
              name="phone_number"
              autoComplete="off"
              value={contact.phone_number}
              onChange={(event) => handleInputChange(event)}
            />
            <div className="label">
              <label htmlFor="phone-input">Phone number</label>
            </div>
          </div>
          <div className="input--element">
            <input
              id="url"
              type="text"
              name="profile_url"
              placeholder=""
              autoComplete="off"
              value={contact.profile_url}
              onChange={(event) => handleInputChange(event)}
            />
            <div className="label">
              <label htmlFor="url">Profile picture</label>
            </div>
          </div>
          <button
            className="list-newBtn main-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add contact"}
          </button>
          <button
            className="cancel-btn off-btn"
            type="button"
            onClick={() => navigate("/contact-list")}
          >
            Cancel
          </button>
          <p className="error-msg">
            {formError && "⚠️ Please fill in all fields!"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default NewContact;
