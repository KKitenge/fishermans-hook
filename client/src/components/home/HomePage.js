import React from "react";
import HomeHeader from "./HomeHeader";
import Logout from "./Logout";

// Homepage component
// This component is the main page of the application after User has logged in
const Homepage = () => {
  const handleLogout = () => {};
  return (
    <div>
      <header>
        <h1>Fishermans Hook</h1>
        <Logout onLogout={handleLogout} />
      </header>
      <HomeHeader />
    </div>
  );
};

export default Homepage;
