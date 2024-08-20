import React, { useState, useEffect } from "react";
import NewContact from "./NewContact";
import ContactCard from "./ContactCard";
import supabase from "../supabase";

function ContactList() {
  const [list, setList] = useState([]);

  //   console.log(supabase);
  //   console.log(list);

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
    if (!contact.name || !contact.phone_number || !contact.profile_url) {
      console.log("Fill in the form");
    } else {
      setList((prevList) => {
        const newList = [...prevList, contact];
        return newList;
      });
    }
  }

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      {list && (
        <div className="contact-card">
          {list.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
      <NewContact handleSubmit={handleSubmit} />
    </div>
  );
}

export default ContactList;
