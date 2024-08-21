import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";
import { Link } from "react-router-dom";

function Login() {
  console.log(supabase.auth.getSession());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
