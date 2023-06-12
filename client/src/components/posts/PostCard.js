import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { AppStateContext } from "../../app-state";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { toast } from "react-toastify";

/**
 *
 * @param {{post:import('../../app-state').Post}} param0
 * @returns
 */
function PostCard({ post }) {
  const { createdAt, postText, postTitle, postAuthor } = post;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const { addComment } = useContext(AppStateContext);
  const [newComment] = useMutation(ADD_COMMENT);

  const handleViewComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    try {
      const { data } = await newComment({
        variables: {
          postId: post._id,
          commentText: comment,
        },
      });

      addComment(data.addComment);

      setComment("");
      toast("Comment  Added", { type: "success" });
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: "error" });
    }
  };

  const style = {
    card: {
      marginBottom: "1rem",
    },
    title: {
      fontWeight: "bold",
    },
    content: {
      marginBottom: "1rem",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    author: {
      fontWeight: "bold",
    },
    commentSection: {
      marginTop: "1rem",
    },
    commentInput: {
      marginTop: "0.5rem",
    },
  };
  return (
    <Card sx={style.card} variant="outlined">
      <CardContent>
        <Typography variant="h6" sx={style.title}>
          {postTitle}
        </Typography>
        <Typography variant="body2" sx={style.content}>
          {postText}
        </Typography>
        <Box sx={style.footer} pt={2}>
          <Button onClick={handleViewComments}>
            {showComments ? "Close" : "View"}
          </Button>
          <Typography variant="subtitle2" sx={style.author}>
            {postAuthor}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {createdAt}
          </Typography>
        </Box>

        {showComments && (
          <Box sx={style.commentSection}>
            <Typography variant="subtitle1">Comments:</Typography>
            {post.comments.map((comment) => (
              <Box key={comment.id}>
                <Typography variant="body2" sx={style.content}>
                  {comment.commentText}
                </Typography>
                <Typography variant="caption" sx={style.author}>
                  By: {comment.commentAuthor} on: {comment.createdAt}
                </Typography>
                <hr></hr>
              </Box>
            ))}
          </Box>
        )}
        {showComments && (
          <Box sx={style.commentInput}>
            <TextField
              label="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={4}
            />
            <br />
            <br />
            <Button onClick={handleAddComment} variant="outlined" size="small">
              Add Comment
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PostCard;
