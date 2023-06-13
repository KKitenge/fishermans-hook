import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Button, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import AuthService from "../../utils/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      // Handle successful user creation
      toast("Login Success", { type: "success" });
      const { token } = data.login;

      console.log("Login success:", data);
      AuthService.login(token);
    } catch (error) {
      // Handle error
      console.error("Login error:", error);
      toast(error.message ?? JSON.stringify(error), { type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center"><span class="wave">👋</span> Login</h1>
      {error && (
        <p className="error">{error.message ?? JSON.stringify(error)}</p>
      )}

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
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
