import React, { useState, useEffect } from "react";

const HomeHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Fetch the username from the database or make an API call here
    // Update the setUsername state with the retrieved username
    const fetchUsername = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          // Handle error if unable to fetch the username
          console.log("Failed to fetch username");
        }
      } catch (error) {
        console.log("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <header>
      <div className="navbar">
        <div
          className={`menu-icon ${isMenuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <div className="welcome-message">
            Welcome, {username ? `${username}!` : ""}
          </div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/notifications">Notifications</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
