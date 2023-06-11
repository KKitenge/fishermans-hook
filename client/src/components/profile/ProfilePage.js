import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { AppStateContext } from '../../app-state';

function ProfilePage() {
  const { appState: { user } } = useContext(AppStateContext);
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [username, setusername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setusername(user.username);
      setEmail(user.email);
    }
  }, [user]);
  return (
    <div>
      <h1 className="text-center">Profile</h1>
      <TextField
        label="First Name"
        value={firstName}
        disabled
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        value={username}
        disabled
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        disabled
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default ProfilePage;