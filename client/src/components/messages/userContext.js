import React from "react";

const UserContext = React.createContext({
  _id: "",
  username: "",
  email: "",
 messages: [],

  handleBtnClick: () => {}
});

export default UserContext;
