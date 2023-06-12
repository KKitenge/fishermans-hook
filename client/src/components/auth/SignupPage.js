import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../../utils/mutations"
import { Button, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';
import AuthService from '../../utils/auth';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username, firstName, email, password },
      });

      // Handle successful user creation
      toast("Registration Success", { type: 'success' })
      const {  token } = data.addUser

      console.log('User created:', data);
      AuthService.login(token)

      
    } catch (error) {
      // Handle error
      console.error('Error creating user:', error);
      toast( error.message?? JSON.stringify(error), { type: 'error' })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-center'>Register</h1>
      {error && <p className='error'>{ error.message?? JSON.stringify(error)}</p>}
      <TextField
        fullWidth
        required
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <AccountCircleIcon />,
        }}
      />
      <TextField
        fullWidth
        required
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <EmailIcon />,
        }}
      />
      <TextField
        fullWidth
        required
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <LockIcon />,
        }}
      />
      <br />
      <br />
      <Button fullWidth type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default SignupPage;