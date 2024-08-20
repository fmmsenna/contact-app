import React from "react";

function ContactCard({ contact }) {
  return (
    <div>
      <img src={contact.profile_url} className="card--img" />
      <p>{contact.name}</p>
      <small>{contact.phone_number}</small>
      <button>X</button>
    </div>
  );
}

export default ContactCard;
