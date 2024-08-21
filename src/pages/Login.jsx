import React, { useEffect, useState } from "react";
import supabase from "../supabase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormError("");

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  async function signInWithEmail(e) {
    e.preventDefault();

    if (!user.password || user.password.length < 6) {
      setFormError("Senha incorreta");
      return;
    } else if (!user.email) {
      setFormError("Preencha o seu email cadastrado");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      setFormError("Email e/ou senha incorretos.");
      return;
    }
    if (data) {
      console.log("Done!");
      //   navigate("/contact-list"); - PRECISO ROUTEAR PARA O ID CORRETO DA PESSOA
    }
  }

  return (
    <div>
      <small>
        <Link to="/sign-up">Sign-up</Link>
      </small>

      <h1>Sign-in to Contacts App ✅</h1>
      <form onSubmit={signInWithEmail}>
        <label htmlFor="email">Your email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          onChange={(event) => handleChange(event)}
          value={user.email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          onChange={(event) => handleChange(event)}
          value={user.password}
        />
        <br />
        <button>Login</button>
      </form>
      <br />
      <button>Login with magic link ✨</button>
      <p>{formError}</p>
    </div>
  );
}

export default Login;
