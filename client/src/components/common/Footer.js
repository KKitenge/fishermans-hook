import React from "react";

// This is the footer that is displayed on every page
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Fisherman's Hook. All rights
          reserved. Created in June 2023.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
