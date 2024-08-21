import React, { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import supabase from "../supabase";
import { Link } from "react-router-dom";

function ContactList() {
  const [list, setList] = useState([]);

  //   console.log(supabase);
  //   console.log(list);

  useEffect(() => {
    console.log("useEffect called");
    async function fetchContacts() {
      const { data, error } = await supabase
        .from("contacts")
        .select()
        .order("name");
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
      .eq("contact_id", contactId)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setList((prevList) =>
        prevList.filter((item) => item.contact_id != contactId)
      );
    }
  }

  return (
    <div>
      <h2>ContactList</h2>
      <Link to="/edit">
        <button>New + </button>
      </Link>
      {list && (
        <div className="contact-card">
          {list.map((contact) => (
            <ContactCard
              key={contact.contact_id}
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
