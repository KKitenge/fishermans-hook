import React from "react";
import { useNavigate } from "react-router-dom";

// Logout component
// This component is used to log the user out of the application
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or perform any other necessary logout logic
    localStorage.removeItem("id_token"); // Example: Remove the authentication token from local storage

    // Reset any relevant state or perform other necessary cleanup

    // Redirect to the login page
    navigate("/AuthPage.js");
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
