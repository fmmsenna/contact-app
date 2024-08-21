import React, { useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

function SignUp() {
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

  async function signUpNewUser(e) {
    e.preventDefault();
    setFormError(null);

    if (!user.password || user.password.length < 6) {
      setFormError("Defina uma senha com ao menos 6 digitos");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    if (error) {
      setFormError("Ops, parece que o formato do email está errado.");
      console.log(error);
      return;
    }
    if (data) {
      console.log("Done!");
      navigate("/");
    }
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={signUpNewUser}>
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
        <label htmlFor="password">Set a strong password</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          onChange={(event) => handleChange(event)}
          value={user.password}
        />
        <br />
        <button>Sign-up</button>
      </form>
      <button>Or go passwordless and use a magic link! ✨</button>
      <p>{formError}</p>
    </div>
  );
}

export default SignUp;
