import './HomeForm.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';


import BookGrid from '../book-grid/BookGrid';
import MeForm from '../me-form/MeForm';
const drawerWidth = 280;

export default function HomeForm() {
  const [selectedPage, setSelectedPage] = useState('Home');
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    console.log('Changing page to:', page);
    setSelectedPage(page);
  };

  const handleLogout = () => {
    // Perform logout actions, such as clearing user session
    // Then redirect to the login page
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#ffba08',
        }}
      >
        <Toolbar className="toolbar">
          <Typography variant="h6" noWrap component="div">
            ChillReads Chamber
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ color: 'red'}}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Home', 'Me'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={selectedPage === text}
                  onClick={() => handlePageChange(text)}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <HomeOutlinedIcon />
                    ) : (
                      <SentimentSatisfiedAltOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedPage === 'Home' && <BookGrid />}{' '}
        {selectedPage === 'Me' && <MeForm />}{' '}
      </Box>{' '}
    </Box>
  );
}
