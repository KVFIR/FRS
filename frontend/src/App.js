import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import UserProfileContainer from './components/UserProfileContainer'; // Импортируем новый компонент
import EventDetails from './components/EventDetails';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      setUser(null);
      // Redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FORZA.EVENTS
            </Typography>
            <Box>
              <Button color="inherit" component={RouterLink} to="/">Home</Button>
              <Button color="inherit" component={RouterLink} to="/events">Events</Button>
              {user && <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>}
              {user ? (
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              ) : (
                <Button color="inherit" onClick={() => window.location.href = 'http://localhost:5000/auth/discord'}>Login</Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList user={user} />} />
          <Route path="/create-event" element={<CreateEvent user={user} />} />
          <Route path="/profile" element={user ? <UserProfileContainer /> : <Navigate to="/" />} />
          <Route path="/events/:id" element={<EventDetails user={user} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
