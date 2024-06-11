import React, { useState } from 'react';
import { Box, Button, Modal, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EditMeFormProps {
  user: { userId: number; name: string; lastName: string; };
  onClose: () => void;
  onSave: (userId: number, name: string, lastName: string) => void;
}

const EditMeForm: React.FC<EditMeFormProps> = ({ user, onClose, onSave }) => {
  const {t}= useTranslation();
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSave = () => {
    onSave(user.userId, name, lastName);
    onClose();
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

  return (
    <Modal open onClose={onClose}>
      <ThemeProvider theme={theme}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
        <Typography variant="h6" component="h2">{t('editUser')}</Typography>
        <TextField fullWidth label={t('name')} value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 2 }} />
        <TextField fullWidth label={t('lastName')} value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ mt: 2 }} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ mr: 1, color: 'red'}}>{t('cancel')}</Button>
        <Button variant="contained" onClick={handleSave}>{t('save')}</Button>
        </Box>
      </Box>
      </ThemeProvider>
    </Modal>
  );
};

export default EditMeForm;
