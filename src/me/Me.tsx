import React from 'react';
import './Me.css';

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
  return (
    <div>
      <h2>Username: {username}</h2>
      <h2>Name: {name}</h2>
      <h2>Last Name: {lastName}</h2>
      <h2>Email: {email}</h2>
    </div>
  );
}
