import React, { useState } from "react";
import NewContact from "./NewContact";

function ContactList() {
  const [list, setList] = useState([]);

  //No submit do formulário vc vai pegar o state do formulário e adicionar no state da lista
  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     if (!contact.name || !contact.number || !contact.url) {
  //       console.log("Fill in the form");
  //     } else {
  //       console.log("Created");
  //     }
  //   }

  function handleSubmit() {}

  return (
    <div>
      <h2>ContactList</h2>
      <button>New +</button>
      <NewContact handleSubmit={handleSubmit} />
    </div>
  );
}

export default ContactList;
