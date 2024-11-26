import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('Please fill in both fields.');
        return;
      }

      const formData = { username, password }; 
      await loginUser(formData); 
      setError('');
      navigate('/questions');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#ebebed',
      }}
    >
      <Card 
        sx={{
          width: "30%",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#fffff',
        }}
      >
        <CardContent>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{
              fontWeight: 'bold',
              color: '#060c40',
              textAlign: 'center',
              marginBottom: 3
            }}
          >
            Welcome Back!
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: 2,
              borderRadius: 2
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 3,
              borderRadius: 2
            }}
          />
        </CardContent>

        <CardActions sx={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleLogin}
            sx={{
              padding: 1.5,
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              bgcolor: '#060c40',
              '&:hover': {
                bgcolor: '#2936ab',
              },
            }}
          >
            Login
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              Not a member? 
            </Typography>
            <Link 
              href="#/registration"
              sx={{
                fontSize: '0.9rem',
                color: '#060c40',
                ml: 1,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Sign up now
            </Link>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
