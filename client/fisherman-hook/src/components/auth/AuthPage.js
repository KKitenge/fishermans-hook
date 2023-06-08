import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Logout from "./Logout";

const AuthPage = () => {
  return (
    <div>
      <h1>
        Discover the best fishing spots and tips for a successful fishing trip.
      </h1>
      <LoginPage />
      <SignupPage />
      <Logout />
    </div>
  );
};

export default AuthPage;
