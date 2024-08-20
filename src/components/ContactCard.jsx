import React from "react";

function ContactCard({ contact, handleDelete }) {
  return (
    <div>
      <img src={contact.profile_url} className="card--img" />
      <p>{contact.name}</p>
      <small>{contact.phone_number}</small>
      <button onClick={() => handleDelete(contact.user_id)}>X</button>
    </div>
  );
}

export default ContactCard;
