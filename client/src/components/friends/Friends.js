import React, { useState } from "react";

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);

  // Commented out because it is not used. May need to be implemented later.
  const addFriend = (friend) => {
    setFriendList((prevFriendList) => [...prevFriendList, friend]);
  };

  const removeFriend = (friendId) => {
    setFriendList((prevFriendList) =>
      prevFriendList.filter((friend) => friend.id !== friendId)
    );
  };

  return (
    <div>
      <h2>FriendList</h2>
      <p>Friends List: {friendList}</p>
      <button onClick={() => addFriend("Friend")}>Add Friend</button>
      <button onClick={() => removeFriend("Friend")}>Remove Friend</button>
    </div>
  );
};

export default FriendList;
