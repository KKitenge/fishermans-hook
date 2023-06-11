import React, { useContext } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { AppStateContext } from '../../app-state';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations';
import { toast } from 'react-toastify';

function FriendsPage() {
  const { isFriend, addFriend, removeFriend } = useContext(AppStateContext);
  const [addFriendMutation] = useMutation(ADD_FRIEND);
  const [removeFriendMutation] = useMutation(REMOVE_FRIEND);

  const { loading, error, data } = useQuery(QUERY_USERS);
  const handleAddFriend = async (user) => {
    try {
      console.log(user)
      await addFriendMutation({
        variables: { username: user.username },
      });

      addFriend(user);
      toast("Friend Added", { type: "success" })
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: 'error' })
    }
  };
  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriendMutation({
        variables: { friendId },
      });

      removeFriend(friendId);
      toast("Friend Removed", { type: "success" })
    } catch (error) {
      console.error(error);
      toast(error.message ?? JSON.stringify(error), { type: 'error' })
    }
  };
  return (
    <div>
      <h1 className='text-center'>
        Friends
      </h1>
      {error && <div className='error'>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}

      {data && data.users.map((user) => (
        <Card key={user._id} sx={{ marginBottom: '1rem' }} variant='outlined'>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">{user.username}</Typography>
                <Typography variant="body2">{user.firstName}</Typography>
              </Box>
              {isFriend(user._id) ? <Button
                variant="outlined"
                color="primary"
                size="small"
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