import React from "react";

function ContactCard({ contact, handleDelete }) {
  return (
    <div className="list-card">
      <img src={contact.profile_url} className="card--img" />
      <p className="card--name">{contact.name} </p>
      <p className="card--number"> | {contact.phone_number}</p>
      <button
        onClick={() => handleDelete(contact.contact_id)}
        className="card--removebtn"
      >
        ❌
      </button>
    </div>
  );
}

export default ContactCard;
