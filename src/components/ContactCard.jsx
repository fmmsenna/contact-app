import React from "react";
import { Link } from "react-router-dom";

function ContactCard({ contact, handleDelete }) {
  return (
    <div className="list-card">
      <img src={contact.profile_url} className="card--img" />
      <p className="card--name">{contact.name} </p>
      <p className="card--number"> | {contact.phone_number}</p>
      <button className="card--edit-btn">
        <Link to={"/" + contact.phone_number}>
          <span className="update-icon">
            <ion-icon name="create-outline"></ion-icon>
          </span>
        </Link>
      </button>
      <button
        onClick={() => handleDelete(contact.contact_id)}
        className="card--removebtn off-btn"
      >
        ❌
      </button>
    </div>
  );
}

export default ContactCard;
