// imported necessary modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { TermsCheckbox } from "../../utils/";
import Auth from "../../utils/auth";

// Login form component
const LoginForm = () => {
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState((initialState) => ({
      ...initialState,
      [name]: value,
    }));
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // clear form values
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  // return jsx, form for email and password
  return (
    <main className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        
         <TermsCheckbox  onChange={(isChecked) => setTermsAccepted(isChecked)} />
      <button type="submit" disabled={!termsAccepted}{...data?(<Link to="/profile"></Link>):error}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default LoginForm;
