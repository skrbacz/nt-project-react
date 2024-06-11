import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Me from '../Me';
import LoansGrid from '../../loan/loans-grid/LoansGrid';
import { useApi } from '../../api/ApiProvider';
import './MeForm.css'; 
import EditMeForm from '../EditMeForm';
import { useTranslation } from 'react-i18next';

interface MeProps {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
}

export default function MeForm() {

  const { t } = useTranslation();
  
  const apiClient = useApi();
  const [user, setUser] = useState<MeProps | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to handle edit form visibility



  useEffect(() => {
    const fetchUser = async () => {
      const meData = await apiClient.getMe();
      setUser(meData.data);
    };
    fetchUser();
  }, [apiClient]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (userId: number, name: string, lastName: string) => {
    const response = await apiClient.patchUser(userId, name, lastName);
    if (response.success) {
      setUser({ ...user!, name, lastName });
    } else {
      console.error('Error updating user:', response.statusCode);
    }
  };

  if (!user) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="me-form">
      <div className="me">
        <Me
          userId={user.userId}
          name={user.name}
          lastName={user.lastName}
          email={user.email}
          username={user.username}
          userRole={user.userRole}
        />
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={handleEdit}
          style={{ backgroundColor: 'rgb(255, 111, 0)' }} // Set background color to 'rgb(255, 111, 0)'
        >
          {t('edit')}
        </Button>
      </div>
      <div className="loans-grid">
        <LoansGrid userId={user.userId} />
      </div>
      {isEditing && (
        <EditMeForm
          user={user}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
