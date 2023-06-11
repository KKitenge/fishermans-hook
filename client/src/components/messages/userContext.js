import React from "react";

// create a new UserContext object
const UserContext = React.createContext({
  _id: "",
  username: "",
  email: "",
 messages: [],

  handleBtnClick: () => {}
});

export default UserContext;
