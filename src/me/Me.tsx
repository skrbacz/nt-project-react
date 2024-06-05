import React from 'react'; // Use React instead of react
import './Me.css';
import Loan, { LoanProps } from '../loan/Loan';

interface MeProps {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  userRole: string;
}

export default function Me({ userId, name, lastName, email, userRole }: MeProps) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <h2>Last Name: {lastName}</h2>
      <h2>Email: {email}</h2>
    </div>
  );
}
