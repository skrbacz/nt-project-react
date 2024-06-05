import React, { useContext, useEffect, useState } from 'react';
import './MeForm.css';
import Me from '../Me';
import LoansGrid from '../../loan/loans-grid/LoansGrid';
import { useApi } from '../../api/ApiProvider';

interface MeProps {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  userRole: string;
}

export default function MeForm() {
  const apiClient = useApi();
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
  return (
    <div className="me-form">
      <div className="me">
        <Me
          userId={user.userId}
          name={user.name}
          lastName={user.lastName}
          email={user.email}
          userRole={user.userRole}
        />
      </div>
      <div className="loans-grid">
        console.log('userId:', user.userId);
        <LoansGrid userId={user.userId} />
      </div>
    </div>
  );
}
