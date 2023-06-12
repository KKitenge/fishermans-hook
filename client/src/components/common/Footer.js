import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="fcontainer">
        <p>
          &copy; {new Date().getFullYear()} <strong>Team Ten</strong>. All rights
          reserved. Created in June 2023.
        </p>
      </div>
    </footer>
  );
};

export default Footer;