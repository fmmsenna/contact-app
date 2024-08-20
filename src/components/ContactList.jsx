import React, { useState, useEffect } from "react";
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

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      {list && (
        <div className="contact-card">
          {list.map((contact) => (
            <ContactCard key={contact.user_id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;
