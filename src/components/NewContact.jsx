import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "./SessionContext";

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
    <div className="newContact--container">
      <form className="form--addNewContact" onSubmit={handleSubmitSupabase}>
        <h1 className="h1--login">New Contact</h1>
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
          <button className="list-newBtn" type="submit">
            Submit
          </button>
          <button
            className="cancel-btn"
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
