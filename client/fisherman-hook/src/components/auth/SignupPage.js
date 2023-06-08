import React, { useState } from "react";

const SignupPage = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupButtonClick = () => {
    setShowSignupForm(true);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
    };

    try {
      // Send a signup request to the server
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful
        console.log("Signup successful");
        // Redirects user to the logged-in page
      } else {
        // Signup failed
        console.log("Signup failed");
        // Display an error message
      }
    } catch (error) {
      // Handle any errors that occur during the signup process
      console.error("Signup error:", error);
      // Display an error message
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      {!showSignupForm && (
        <button onClick={handleSignupButtonClick}>Signup</button>
      )}
      {showSignupForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Signup</button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
