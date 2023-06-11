import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import FriendList from "../components/friends/Friends";

const ProfilePage = ({ userInfo, userPosts, plannedTrips }) => {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="profile-content">
        <div className="left-column">
          <FriendList />
        </div>
        <div className="center-column">
          <div className="user-info">
            <h2>User Information</h2>
            <p>Name: {userInfo.firstName}</p>
            <p>Email: {userInfo.email}</p>
          </div>
          <div className="user-posts">
            <h2>User Posts</h2>
            {userPosts.map((post) => (
              <div key={post._id} className="post">
                <p>{post.postTitle}</p>
                <p>{post.postText}</p>
                <p>Author: {post.postAuthor}</p>
                <p>Created At: {post.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right-column">
          <h2>Planned Trips</h2>
          <ul>
            {plannedTrips.map((trip, index) => (
              <li key={index}>
                Destination: {trip.destination}
                <br />
                Time: {trip.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
