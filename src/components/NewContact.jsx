import React, { useState } from "react";

function NewContact(props) {
  const [contact, setContact] = useState({
    id: "",
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
  console.log(contact);

  return (
    <form onSubmit={(event) => props.handleSubmit(event)}>
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
