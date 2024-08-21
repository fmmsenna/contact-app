import React from "react";

function SignUp() {
  return (
    <div>
      <h1>Create an account</h1>
      <label htmlFor="email">Your email</label>
      <br />
      <input type="text" id="email" />
      <br />
      <label htmlFor="password">Set a strong password</label>
      <br />
      <input type="text" id="password" />
      <br />
      <button>Sign-up</button>
    </div>
  );
}

export default SignUp;
