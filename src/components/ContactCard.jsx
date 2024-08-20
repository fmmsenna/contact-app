import React from "react";
import supabase from "../supabase";

function ContactCard({ contact }) {
  async function handleDelete() {
    const { data, error } = await supabase
      .from("contacts")
      .delete()
      .eq("user_id", contact.user_id)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  return (
    <div>
      <img src={contact.profile_url} className="card--img" />
      <p>{contact.name}</p>
      <small>{contact.phone_number}</small>
      <button onClick={handleDelete}>X</button>
    </div>
  );
}

export default ContactCard;
