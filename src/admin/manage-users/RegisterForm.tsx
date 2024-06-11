import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { useApi } from '../../api/ApiProvider';
import { MeProps } from '../../me/Me';
import RegisterUserForm from './RegisterUserForm';
import { useTranslation } from 'react-i18next';

const ManageUsers: React.FC = () => {
  const {t}= useTranslation();
  const apiClient = useApi();
  const [users, setUsers] = useState<MeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      let allUsersData: MeProps[] = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore) {
        const usersData = await apiClient.getUsers(currentPage);
        const fetchedUsers = usersData.data?.users || [];
        allUsersData = allUsersData.concat(fetchedUsers);
        hasMore = usersData.data?.hasMore || false;
        currentPage++;
      }

      setUsers(allUsersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [apiClient]);

  const handleUserListChange = () => {
    fetchUsers();
  };

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div>
      <RegisterUserForm onRegisterUser={handleUserListChange}/>
      <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', margin: '10px 0' }} />
      <UserList users={users} onDeleteUser={handleUserListChange} />
    </div>
  );
};

export default ManageUsers;
