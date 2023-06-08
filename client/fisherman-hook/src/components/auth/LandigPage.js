import React from "react";
import Login from "Login";
import Signup from "Signup";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Fisherman's Hook!</h1>
      <p>Explore the best fishing spots and connect with fellow anglers.</p>
      <Signup />
      <Login />
    </div>
  );
};

export default LandingPage;
