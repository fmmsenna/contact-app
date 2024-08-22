import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "./SessionContext";

function NewContact() {
  const { session, setSession } = useContext(SessionContext);

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone_number: "",
    profile_url: "",
    contact_id: "",
  });
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
      }
    };

    getSession();
  }, []);

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
  }

  return (
    <form onSubmit={handleSubmitSupabase}>
      <h1>New Contact</h1>
      <label htmlFor="name">Name</label>
      <br />
      <input
        id="name"
        type="text"
        name="name"
        value={contact.name}
        onChange={(event) => handleInputChange(event)}
      />
      <br />
      <label htmlFor="phone-input">Phone number</label>
      <br />
      <input
        id="phone-input"
        placeholder="(  )    -    "
        type="number"
        name="phone_number"
        value={contact.phone_number}
        onChange={(event) => handleInputChange(event)}
      />
      <br />
      <label htmlFor="url">Profile picture</label>
      <br />
      <input
        id="url"
        type="text"
        name="profile_url"
        value={contact.profile_url}
        onChange={(event) => handleInputChange(event)}
      />
      <br />
      <button>Submit</button>
      <Navigate to="/">
        <button>Cancelar</button>
      </Navigate>

      {formError && <p>Please fill in all fields!</p>}
    </form>
  );
}

export default NewContact;
