import React from "react";
import HomeHeader from "./HomeHeader";
import Logout from "./Logout";

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
