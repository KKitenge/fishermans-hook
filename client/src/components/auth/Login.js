// imported necessary modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Login page component
const LoginPage = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default LoginPage;
