import React from "react";
import Login from "./Login";
// import LoginForm from "./LoginForm";
import Signup from "./Signup";
import Footer from "../common/Footer.js";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Fisherman's Hook!</h1>
      <p>Explore the best fishing spots and connect with fellow anglers.</p>
      <Signup />
      <Login />
      {/* <LoginForm /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
