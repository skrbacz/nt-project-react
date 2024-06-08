import './HomeForm.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
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
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

import MeForm from '../me/me-form/MeForm';
import { useApi } from '../api/ApiProvider';
import BookGrid from '../book/book-grid/BookGrid';
import RegisterUserForm from '../admin/RegisterUserForm';
import ManageBooksForm from '../admin/manage-books/ManageBooksForm';
import { MeProps } from '../me/Me';
import RegisterForm from '../admin/RegisterForm';

const drawerWidth = 280;


export default function HomeForm() {
  const apiClient = useApi();

  const [selectedPage, setSelectedPage] = useState('Home');
  const navigate = useNavigate();

  const [user, setUser] = useState<MeProps | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const meData = await apiClient.getMe();
      console.log(meData.data);
      setUser(meData.data);
    };
    fetchBooks();
  }, [apiClient]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page: string) => {
    console.log('Changing page to:', page);
    setSelectedPage(page);
  };

  const handleLogout = () => {
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
          <Button color="inherit" onClick={handleLogout} sx={{ color: 'red' }}>
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
          {['Home', 'Me'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selectedPage === text}
                onClick={() => handlePageChange(text)}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeOutlinedIcon />
                  ) : (
                    <SentimentSatisfiedAltOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          {user.userRole === 'ROLE_ADMIN' && (
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedPage === 'Add user'}
                onClick={() => handlePageChange('Add user')}
              >
                <ListItemIcon>
                  <AssignmentIndOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Add user" />
              </ListItemButton>
            </ListItem>
          )}
          {user.userRole === 'ROLE_ADMIN' && (
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedPage === 'Manage Books'}
                onClick={() => handlePageChange('Manage Books')}
              >
                <ListItemIcon>
                  <AutoStoriesOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Books" />
              </ListItemButton>
            </ListItem>
          )}
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {user.userRole === 'ROLE_ADMIN' && (
          <>
            {selectedPage === 'Home' && (
              <>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <BookGrid />
              </>
            )}
            {selectedPage === 'Me' && (
              <>
                <ListItemIcon>
                  <SentimentSatisfiedAltOutlinedIcon />
                </ListItemIcon>
                <MeForm />
              </>
            )}
            {selectedPage === 'Add user' && (
              <>
                <ListItemIcon>
                  <AssignmentIndOutlinedIcon />
                </ListItemIcon>
                <RegisterForm />
              </>
            )}
            {selectedPage === 'Manage Books' && (
              <>
                <ListItemIcon>
                  <AutoStoriesOutlinedIcon />
                </ListItemIcon>
                <ManageBooksForm />
              </>
            )}
          </>
        )}
        {user.userRole === 'ROLE_READER' && (
          <>
            {selectedPage === 'Home' && (
              <>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <BookGrid />
              </>
            )}
            {selectedPage === 'Me' && (
              <>
                <ListItemIcon>
                  <SentimentSatisfiedAltOutlinedIcon />
                </ListItemIcon>
                <MeForm />
              </>
            )}
          </>
        )}
      </Box>{' '}
    </Box>
  );
}
