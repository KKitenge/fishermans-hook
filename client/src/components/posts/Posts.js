import React, { useState } from "react";

// Posts component
const Posts = () => {
  // useState to set the postList
  const [postList, setPostList] = useState([]);
  // useState to set the newPost
  const [newPost, setNewPost] = useState("");
  // useState to set the comment
  const [comment, setComment] = useState("");

  // addPost function
  const addPost = () => {
    // if newPost is not empty
    if (newPost.trim() !== "") {
      // create a new post object
      const post = {
        // use Date.now() to generate a unique id
        id: Date.now(),
        // set the content to newPost
        content: newPost,
        // set the comments to an empty array
        comments: [],
      };
      // setPostList to include the post
      setPostList((prevPostList) => [...prevPostList, post]);
      // setNewPost to empty string
      setNewPost("");
    }
  };

  // addComment function
  const addComment = (postId) => {
    // if comment is not empty
    if (comment.trim() !== "") {
      // setPostList to map through the postList
      setPostList((prevPostList) =>
        // prevPoostList to map through the posts
        prevPostList.map((post) =>
        // if the post id matches the postId
          post.id === postId
          // return the post with the comments array including the new comment
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
      // setComment to empty string
      setComment("");
    }
  };

  // removePost function
  const removePost = (postId) => {
    // setPostList to filter through the postList and return the posts that do not match the postId
    setPostList((prevPostList) =>
      prevPostList.filter((post) => post.id !== postId)
    );
  };

  // return the JSX
  // input to add a new post
  // button to add the post
  // if postList is not empty
  // ul to map through the postList and return the post content
  // input to add a new comment
  // button to add the comment
  // if the post has comments
  // ul to map through the comments and return the comment content
  // button to remove the post
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
