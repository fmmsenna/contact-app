import React, { useState, useEffect, useContext } from "react";
import ContactCard from "./ContactCard";
import supabase from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";

function ContactList() {
  const [list, setList] = useState([]);
  const { setSession } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSession(session);
      } else {
        navigate("/");
      }
    };

    getSession();
  }, []);

  useEffect(() => {
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
      setList((prevList) =>
        prevList.filter((item) => item.contact_id != contactId)
      );
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>ContactList</h2>
      <Link to="/edit">
        <button>New + </button>
      </Link>
      <Link to="/">
        <button onClick={signOut}>Sign-out</button>
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
