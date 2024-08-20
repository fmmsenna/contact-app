import React, { useState, useEffect } from "react";
import NewContact from "./NewContact";
import ContactCard from "./ContactCard";
import supabase from "../supabase";

function ContactList() {
  const [list, setList] = useState([]);

  console.log(supabase);

  useEffect(() => {
    console.log("useEffect called");
    async function fetchContacts() {
      const { data, error } = await supabase.from("contacts").select();

      if (error) {
        console.log(error);
      }

      if (data) {
        setList(data);
      }
    }

    fetchContacts();
  }, []);

  function handleSubmit(event, contact) {
    event.preventDefault();
    if (!contact.name || !contact.number || !contact.url) {
      console.log("Fill in the form");
    } else {
      setList((prevList) => {
        const newList = [...prevList, contact];
        return newList;
      });
    }
  }

  const cards = list.map((contact) => {
    return (
      <ContactCard
        key={contact.phone_number}
        name={contact.name}
        number={contact.phone_number}
        url={contact.profile_url}
      />
    );
  });

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      {cards}
      <NewContact handleSubmit={handleSubmit} />
    </div>
  );
}

export default ContactList;
