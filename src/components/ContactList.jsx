import React, { useState } from "react";
import NewContact from "./NewContact";

function ContactList() {
  const [contact, setContact] = useState({
    name: "",
    number: "",
    url: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log("changed here");
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!contact.name || !contact.number || !contact.url) {
      console.log("Fill in the form");
    } else {
      console.log("Created");
    }
  }

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      <NewContact
        contact={contact}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default ContactList;
