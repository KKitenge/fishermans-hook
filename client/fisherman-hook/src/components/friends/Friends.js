import React, { useState } from "react";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  const addFriend = () => {
    if (newFriend.trim() !== "") {
      setFriends([...friends, newFriend]);
      setNewFriend("");
    }
  };

  const removeFriend = (friend) => {
    const updatedFriends = friends.filter((f) => f !== friend);
    setFriends(updatedFriends);
  };

  return (
    <div>
      <h1>My Friends</h1>
      <input
        type="text"
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
      />
      <button onClick={addFriend}>Add Friend</button>

      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            {friend}
            <button onClick={() => removeFriend(friend)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
