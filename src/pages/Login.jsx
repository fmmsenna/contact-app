import React, { useEffect, useState, useContext } from "react";
import supabase from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../components/SessionContext";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);
  const { session, setSession } = useContext(SessionContext);

  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
        navigate("/contact-list");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormError("");

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  //FUNÇÃO CONSIDERANDO LOGIN COM EMAIL + SENHA
  /*
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
*/

  //FUNÇÃO CONSIDERANDO MAGIC LINK
  async function signInWithEmail(e) {
    e.preventDefault();

    if (!user.email) {
      setFormError("Preencha um email válido, no formato seunome@email.com");
      return;
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      setFormError("Preencha um email válido, no formato seunome@email.com");
      return;
    }
    if (data) {
      console.log("Done!");
      navigate("/check-email");
    }
  }

  return (
    <div>
      {/* 
        REDIRECT PARA SIGN-UP USANDO EMAIL + SENHA
      <small>
        <Link to="/sign-up">Sign-up</Link>
      </small> */}

      <h1>Sign-in to Contacts App ✅</h1>
      {/*
      FORM CONSIDERANDO EMAIL + SENHA
       <form>
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
      </form> */}
      <br />
      <form onSubmit={signInWithEmail}>
        <input
          type="text"
          id="email"
          name="email"
          onChange={(event) => handleChange(event)}
          value={user.email}
        />
        <br />
        <button>Login with magic link ✨</button>
      </form>
      <p>{formError}</p>
    </div>
  );
}

export default Login;
