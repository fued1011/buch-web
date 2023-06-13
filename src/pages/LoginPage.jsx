import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Hier die Login-Logik implementieren
  };

  return (
    <div>
      <TextField
        label="Benutzername"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="Passwort"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={handleLogin}>
        Anmelden
      </Button>
    </div>
  );
};

export default LoginPage;