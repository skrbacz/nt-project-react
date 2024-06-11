import React from 'react';
import './Me.css';
import { useTranslation } from 'react-i18next';

export interface MeProps {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
}

export default function Me({
  userId,
  name,
  lastName,
  email,
  username,
  userRole
}: MeProps) {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('username')}: {username}</h2>
      <h2>{t('name')}: {name}</h2>
      <h2>{t('lastName')}: {lastName}</h2>
      <h2>{t('email')}: {email}</h2>
    </div>
  );
}
