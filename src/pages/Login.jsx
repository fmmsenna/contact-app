import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <small>
        <Link to="/sign-up">Sign-up</Link>
      </small>

      <h1>Sign-in to Contacts App ✅</h1>
      <label htmlFor="email">Your email</label>
      <br />
      <input type="text" id="email" />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input type="text" id="password" />
      <br />
      <button>Login</button>
      <br />
      <button>Login with magic link ✨</button>
    </div>
  );
}

export default Login;
