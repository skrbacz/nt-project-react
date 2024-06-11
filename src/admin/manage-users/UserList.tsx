import React from 'react';
import { useApi } from '../../api/ApiProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { MeProps } from '../../me/Me';
import { useTranslation } from 'react-i18next';

interface UserListProps {
  users: MeProps[];
  onDeleteUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser }) => {
  const { t } = useTranslation();
  const clientApi = useApi();

  const handleDelete = async (userId: number) => {
    console.log(t('attemptingDeletingUser'), userId);
    const response = await clientApi.deleteUser(userId);
    if (response.success) {
      console.log(t('successDeletingUser'), userId);
      onDeleteUser(userId);
    } else {
      console.error(t('errorDeletingUser'), response.statusCode);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Users List
      </Typography>
      <List sx={{ overflow: 'auto', maxHeight: 300 }}>
        {users.map((user: MeProps, index) => (
          <React.Fragment key={user.userId}>
            <ListItem>
              <ListItemIcon>
                <IconButton onClick={() => handleDelete(user.userId)}>
                  <DeleteOutlineOutlinedIcon
                    style={{
                      cursor: 'pointer',
                      marginLeft: '5px',
                      color: 'red',
                    }}
                  />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={t('userId') + ': ' + user.userId}
                secondary={
                  t('name') +
                  ': ' +
                  user.name +
                  ',  ' +
                  t('lastName') +
                  ': ' +
                  user.lastName +
                  ', ' +
                  t('email') +
                  ': ' +
                  user.email +
                  ', ' +
                  t('username') +
                  ': ' +
                  user.username +
                  ', ' +
                  t('role') +
                  ': ' +
                  user.userRole
                }
              />
            </ListItem>
            {index < users.length - 1 && (
              <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default UserList;
