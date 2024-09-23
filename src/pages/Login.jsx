import React, { useEffect, useState, useContext } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../components/SessionContext";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setSession } = useContext(SessionContext);

  const navigate = useNavigate();

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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

  //FUNCTION TO ADD LOGIN WITH EMAIL + PASSWORD
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

    if (!user.email || !isEmail(user.email)) {
      setFormError((prevState) => !prevState);
      return;
    }

    setIsLoading((prevState) => !prevState);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      setFormError((prevState) => !prevState);
      return;
    }
    if (data) {
      navigate("/check-email");
    }
    setIsLoading((prevState) => !prevState);
  }

  return (
    <div className="container">
      <form className="form--login" onSubmit={signInWithEmail}>
        <ion-icon name="mail" aria-hidden="true"></ion-icon>
        <h1 className="h1--login">Log in to ContactsApp</h1>
        <input
          className="input"
          type="text"
          id="email"
          name="email"
          placeholder="Your email"
          onChange={(event) => handleChange(event)}
          value={user.email}
          autoComplete="off"
        />
        <button className="button main-btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In with magic link ✨"}
        </button>
        <p className="error-msg">
          {formError && "⚠️ Fill in an email like: yourname@email.com"}
        </p>
      </form>
    </div>
  );
}

export default Login;

{
  /* 
        REDIRECT TO SIGN-UP USING EMAIL + PASSWORD
      <small>
        <Link to="/sign-up">Sign-up</Link>
      </small> */
}

{
  /*
      FORM CONSIDERING EMAIL + PASSWORD
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
      </form> */
}
