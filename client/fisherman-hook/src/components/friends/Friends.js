import React, { useState } from "react";

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);

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
      <h2>Friends List</h2>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friend) => (
            <li key={friend.id}>
              {friend.name}
              <button onClick={() => removeFriend(friend.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends in the list.</p>
      )}
    </div>
  );
};


export default FriendList;