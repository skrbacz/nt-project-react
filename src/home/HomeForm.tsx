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
import IconButton from '@mui/material/IconButton';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import MeForm from '../me/me-form/MeForm';
import { useApi } from '../api/ApiProvider';
import BookGrid from '../book/book-grid/BookGrid';
import ManageBooksForm from '../admin/manage-books/ManageBooksForm';
import { MeProps } from '../me/Me';
import ManageLoansForm from '../admin/manage-loans/ManageLoansForm';
import { ThemeProvider, createTheme } from '@mui/material';
import RegisterForm from '../admin/manage-users/RegisterForm';
import { useTranslation } from 'react-i18next';

const drawerWidth = 280;

export default function HomeForm() {
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [selectedPage, setSelectedPage] = useState('home');
  const navigate = useNavigate();
  const [user, setUser] = useState<MeProps | null>(null);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.getMe();
        if(response.success){
          console.log(response.data);
          setUser(response.data);
        }else {
          if(response.statusCode=== 403){
            navigate('/login');
          }
        } 
      } catch (error) {
        console.error(t('unexpectedError'), error);
      } 
    };
    fetchBooks();
  }, [apiClient, navigate]);

  useEffect(() => {
    // Maintain current page when language changes
    setSelectedPage(prevPage => prevPage);
  }, [language]);

  if (!user) {
    navigate('/login')
    return <div>{t('loading')}</div>;
  }

  const handlePageChange = (page: string) => {
    console.log('Changing page to:', page);
    setSelectedPage(page);
  };

  const handleLogout = async () => {
    await apiClient.logout();
    navigate('/login');
  };

  const handleLanguageChange = () => {
    const newLanguage = language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 111, 0)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
    },
  });

  const pages = [
    { label: 'home', icon: <HomeOutlinedIcon /> },
    { label: 'me', icon: <SentimentSatisfiedAltOutlinedIcon /> },
  ];

  const adminPages = [
    { label: 'manageUsers', icon: <AssignmentIndOutlinedIcon /> },
    { label: 'manageBooks', icon: <AutoStoriesOutlinedIcon /> },
    { label: 'manageLoans', icon: <BookmarkBorderOutlinedIcon /> },
  ];

  const translatedPage = (page: string) => {
    switch (page) {
      case 'home':
        return t('home');
      case 'me':
        return t('me');
      case 'manageUsers':
        return t('manageUsers');
      case 'manageBooks':
        return t('manageBooks');
      case 'manageLoans':
        return t('manageLoans');
      default:
        return t('home');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
              {t('library')}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={handleLogout} sx={{ color: 'red' }}>
              <LogoutIcon />
            </Button>
            <IconButton color="inherit" onClick={handleLanguageChange}>
              <img
                src={`https://flagcdn.com/w20/${language === 'pl' ? 'pl' : 'gb'}.png`}
                alt={language === 'pl' ? 'Polish flag' : 'British flag'}
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
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
            {pages.map((page) => (
              <ListItem key={page.label} disablePadding>
                <ListItemButton
                  selected={selectedPage === page.label}
                  onClick={() => handlePageChange(page.label)}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={translatedPage(page.label)} />
                </ListItemButton>
              </ListItem>
            ))}
            {user.userRole === 'ROLE_ADMIN' &&
              adminPages.map((page) => (
                <ListItem key={page.label} disablePadding>
                  <ListItemButton
                    selected={selectedPage === page.label}
                    onClick={() => handlePageChange(page.label)}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={translatedPage(page.label)} />
                  </ListItemButton>
                </ListItem>
              ))}
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {user.userRole === 'ROLE_ADMIN' && (
            <>
              {selectedPage === 'home' && (
                <>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <BookGrid />
                </>
              )}
              {selectedPage === 'me' && (
                <>
                  <ListItemIcon>
                    <SentimentSatisfiedAltOutlinedIcon />
                  </ListItemIcon>
                  <MeForm />
                </>
              )}
              {selectedPage === 'manageUsers' && (
                <>
                  <ListItemIcon>
                    <AssignmentIndOutlinedIcon />
                  </ListItemIcon>
                  <RegisterForm />
                </>
              )}
              {selectedPage === 'manageBooks' && (
                <>
                  <ListItemIcon>
                    <AutoStoriesOutlinedIcon />
                  </ListItemIcon>
                  <ManageBooksForm />
                </>
              )}
              {selectedPage === 'manageLoans' && (
                <>
                  <ListItemIcon>
                    <BookmarkBorderOutlinedIcon />
                  </ListItemIcon>
                  <ManageLoansForm />
                </>
              )}
            </>
          )}
          {user.userRole === 'ROLE_READER' && (
            <>
              {selectedPage === 'home' && (
                <>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <BookGrid />
                </>
              )}
              {selectedPage === 'me' && (
                <>
                  <ListItemIcon>
                    <SentimentSatisfiedAltOutlinedIcon />
                  </ListItemIcon>
                  <MeForm />
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
