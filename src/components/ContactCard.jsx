import React from "react";

function ContactCard({ name, number, url }) {
  return (
    <div>
      <img src={url} className="card--img" />
      <p>{name}</p>
      <small>{number}</small>
      <button>X</button>
    </div>
  );
}

export default ContactCard;
