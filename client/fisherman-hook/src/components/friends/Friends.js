import React, { useState } from "react";

const Friends = ({ friendsList }) => {
  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friendsList.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

const FriendsPage = () => {
  const [friendsList, setFriendsList] = useState([]);

  // Function to add a friend to the list
  const addFriend = (friend) => {
    setFriendsList([...friendsList, friend]);
  };

  // Example usage of addFriend
  const handleAddFriend = () => {
    const newFriend = { id: friendsList.length + 1, name: "New Friend" };
    addFriend(newFriend);
  };

  return (
    <div>
      <Friends friendsList={friendsList} />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default FriendsPage;
