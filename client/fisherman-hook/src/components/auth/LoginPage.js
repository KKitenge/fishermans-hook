import React, { useState } from "react";

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validates users input
    if (identifier.trim() === "" || password.trim() === "") {
      // Displays error message
      console.log("Invalid input");
      return;
    }

    try {
      // sends response to server for authentication
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        // Successful Login -- redirect to the homepage
        console.log("Login successful");
      } else {
        // Failed login -- display error message
        console.log("Login failed");
      }
    } catch (error) {
      // handles any errors that occur during login
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {!showLoginForm && <button onClick={handleToggleForm}>Login</button>}
      {showLoginForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={handleIdentifierChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
