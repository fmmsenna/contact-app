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

  async function handleDelete(contactId) {
    const { data, error } = await supabase
      .from("contacts")
      .delete()
      .eq("user_id", contactId)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setList((prevList) =>
        prevList.filter((item) => item.user_id != contactId)
      );
    }
  }

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      {list && (
        <div className="contact-card">
          {list.map((contact) => (
            <ContactCard
              key={contact.user_id}
              contact={contact}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;
