import React, { useState, useEffect } from "react";
import NewContact from "./NewContact";
import ContactCard from "./ContactCard";

function ContactList() {
  const [list, setList] = useState([]);

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
        name={contact.name}
        number={contact.number}
        url={contact.url}
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
