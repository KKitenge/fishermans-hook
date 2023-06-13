import React, { useContext, useState } from "react";
// imported Box, Card, CardContent, Typography, Button from MUI
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { AppStateContext } from "../../app-state";
// imported PersonAddIcon, GroupIcon from MUI
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
// imported useMutation, useQuery from Apollo
import { useMutation, useQuery } from "@apollo/client";
// imported QUERY_USERS, ADD_FRIEND, REMOVE_FRIEND from utils
import { QUERY_USERS } from "../../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";
// imported toast from react-toastify
import { toast } from "react-toastify";

// created FriendsPage function
function FriendsPage() {
  // used useContext to get isFriend, addFriend, removeFriend from app-state
  const { isFriend, addFriend, removeFriend } = useContext(AppStateContext);
  // used useMutation to get addFriendMutation, removeFriendMutation from ADD_FRIEND, REMOVE_FRIEND
  const [addFriendMutation] = useMutation(ADD_FRIEND);
  const [removeFriendMutation] = useMutation(REMOVE_FRIEND);
  // const [selectedFriend, setSelectedFriend] = useState(null);

  // used useQuery to get loading, error, data from QUERY_USERS
  const { loading, error, data } = useQuery(QUERY_USERS);

  // created handleAddFriend function
  const handleAddFriend = async (user) => {
    // try to addFriendMutation
    try {
      console.log(user);
      await addFriendMutation({
        variables: { username: user.username },
      });

      // addFriend to app-state
      addFriend(user);
      // toast success
      toast("Friend Added", { type: "success" });
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: "error" });
    }
    // setSelectedFriend(user);
  };

  // created handleRemoveFriend function
  const handleRemoveFriend = async (friendId) => {
    // try to removeFriendMutation
    try {
      await removeFriendMutation({
        variables: { friendId },
      });
      // removeFriend from app-state
      removeFriend(friendId);
      // toast success, display Friend Removed
      toast("Friend Removed", { type: "success" });
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: "error" });
    }
  };

  // return JSX for FriendsPage
  return (
    <div>
      <h1 className='text-center'>
        Friends
      </h1>
      {/* if error, display error */}
      {error && <div className='error'>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      {/* if data, map through data.users */}
      {data && data.users && data.users.map((user) => (
        // return Card with user._id as key
        <Card key={user._id} sx={{ marginBottom: '1rem' }} variant='outlined'>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">{user.username}</Typography>
                <Typography variant="body2">{user.firstName}</Typography>
              </Box>
              {/* if isFriend(user._id), display Remove Button, else display Add Button */}
              {isFriend(user._id) ? <Button
                variant="outlined"
                color="primary"
                size="small"
                // when user clicks Remove Button, call handleRemoveFriend(user._id)
                onClick={() => handleRemoveFriend(user._id)}
                startIcon={<GroupIcon />}>Remove</Button> :
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonAddIcon />}
                  onClick={() => handleAddFriend(user)}
                >
                  {" Add "}
                </Button>
              }
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export default FriendsPage;
