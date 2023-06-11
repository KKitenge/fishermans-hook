import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Signup page component
const SignupPage = () => {
  // state hooks
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // useMutation hook
  const [addUser] = useMutation(ADD_USER);

  // handle input change function
  const handleInputChange = (event) => {
    // get name and value from event.target
    const { name, value } = event.target;

    // set state
    setFormState({
      // spread operator on the formState object
      ...formState,
      // set the value of the key that matches the value of the name attribute
      [name]: value,
    });
  };

  // handle form submit function
  const handleFormSubmit = async (event) => {
    // prevent default behavior
    event.preventDefault();
    console.log(formState);

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from the form
      const { data } = await addUser({
        variables: { ...formState },
      });

      //  The Auth.login() method is a static method that will save the token to localStorage and then redirect the user to the homepage.
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  // return jsx, form for username, email, password, and confirm password
  return (
    <main className="signup-page">
      <h1>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

// export SignupPage component
export default SignupPage;
