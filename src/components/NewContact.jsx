import React, { useState } from "react";

function NewContact(props) {
  const [contact, setContact] = useState({
    name: "",
    number: "",
    url: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={(event) => props.handleSubmit(event, contact)}>
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
        placeholder="(  )    -    "
        type="number"
        name="number"
        value={contact.number}
        onChange={(event) => handleInputChange(event)}
      />
      <br />
      <label htmlFor="url">Profile picture</label>
      <br />
      <input
        id="url"
        type="text"
        name="url"
        value={contact.url}
        onChange={(event) => handleInputChange(event)}
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default NewContact;
