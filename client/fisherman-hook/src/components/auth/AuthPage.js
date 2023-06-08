import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthPage = () => {
  return (
    <div>
      <h1>
        Discover the best fishing spots and tips for a successful fishing trip.
      </h1>
      <LoginPage />
      <SignupPage />
    </div>
  );
};

export default AuthPage;
