import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase";

function UpdateContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    phone_number: "",
    profile_url: "",
    contact_id: "",
  });

  useEffect(() => {
    async function fetchContactInfo() {
      const { data, error } = await supabase
        .from("contacts")
        .select()
        .eq("phone_number", id)
        .single();
      if (error) {
        console.log(error);
        setFormError((prevState) => !prevState);
      }
      if (data) {
        setContact(data);
      }
    }

    fetchContactInfo();
  }, []);

  function handleInputChange(event) {
    setFormError(false);
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  }

  async function handleUpdateSupabase(e) {
    e.preventDefault();
    if (!contact.name || !contact.phone_number || !contact.profile_url) {
      setFormError((prevState) => !prevState);
      return;
    }

    setIsLoading((prevState) => !prevState);

    const { data, error } = await supabase
      .from("contacts")
      .update({
        name: contact.name,
        phone_number: contact.phone_number,
        profile_url: contact.profile_url,
      })
      .eq("phone_number", id)
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

  return (
    <div className="newContact--container">
      <form className="form--addNewContact" onSubmit={handleUpdateSupabase}>
        <h1 className="h1--login">Update Contact</h1>
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
            {isLoading ? "Updating..." : "Update"}
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

export default UpdateContact;
