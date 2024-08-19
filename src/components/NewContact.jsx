import React from "react";

function NewContact(props) {
  return (
    <form onSubmit={(event) => props.handleSubmit(event)}>
      <h1>New Contact</h1>
      <label htmlFor="name">Name</label>
      <br />
      <input
        id="name"
        type="text"
        name="name"
        value={props.contact.name}
        onChange={(event) => props.handleInputChange(event)}
      />
      <br />
      <label htmlFor="phone-input">Phone number</label>
      <br />
      <input
        placeholder="(  )    -    "
        name="number"
        value={props.contact.number}
        onChange={(event) => props.handleInputChange(event)}
      />
      <br />
      <label htmlFor="url">Profile picture</label>
      <br />
      <input
        id="url"
        type="text"
        name="url"
        value={props.contact.url}
        onChange={(event) => props.handleInputChange(event)}
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default NewContact;
