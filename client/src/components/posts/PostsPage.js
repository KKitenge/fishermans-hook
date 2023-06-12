import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ADD_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import PostCard from './PostCard';
import { AppStateContext } from '../../app-state';


export default function PostsPage() {
  const { appState: { user, posts }, addPost} = useContext(AppStateContext);
  const [AddPost] = useMutation(ADD_POST);
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleAddPost = async () => {
    try {
      const { data } = await AddPost({
        variables: {
          postTitle,
          postText,
          postAuthor: user.username
        },
      });

      addPost(data.addPost);

      // Reset the form fields
      setPostTitle('');
      setPostText('');

      // Close the dialog
      handleClose();

      toast("Post Added", { type: "success" })
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: 'error' })
    }
  };
  return (
    <div>
      <h1 className='text-center'>
        Posts
      </h1>
      {posts && <div>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
      }
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={postTitle}
            onChange={handlePostTitleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Text"
            value={postText}
            onChange={handlePostTextChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPost} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
