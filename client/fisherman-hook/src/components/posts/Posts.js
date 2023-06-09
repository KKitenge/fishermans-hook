import React, { useState } from "react";

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comment, setComment] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      const post = {
        id: Date.now(),
        content: newPost,
        comments: [],
      };
      setPostList((prevPostList) => [...prevPostList, post]);
      setNewPost("");
    }
  };

  const addComment = (postId) => {
    if (comment.trim() !== "") {
      setPostList((prevPostList) =>
        prevPostList.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    content: comment,
                  },
                ],
              }
            : post
        )
      );
      setComment("");
    }
  };

  const removePost = (postId) => {
    setPostList((prevPostList) =>
      prevPostList.filter((post) => post.id !== postId)
    );
  };

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Enter your post"
        />
        <button onClick={addPost}>Add Post</button>
      </div>
      {postList.length > 0 ? (
        <ul>
          {postList.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <div>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment"
                />
                <button onClick={() => addComment(post.id)}>Add Comment</button>
              </div>
              {post.comments.length > 0 && (
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                  ))}
                </ul>
              )}
              <button onClick={() => removePost(post.id)}>Remove Post</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
