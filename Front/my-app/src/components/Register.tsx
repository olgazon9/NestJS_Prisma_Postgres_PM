import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import authService from '../services/authService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await authService.register({ email, password, name });
      console.log(response.data);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Register;
