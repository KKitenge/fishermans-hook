import React, { useState } from "react";

const ProfileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="profile-header">
        <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="hamburger-icon" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`menu-items ${isMenuOpen ? "show" : ""}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="./profile">Profile</a>
            </li>
            <li>
              <a href="./notifications">Notifications</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;



