import React from 'react'; // Use React instead of react
import './Me.css';
import Loan, { LoanProps } from '../loan/Loan';


interface MeProps{
  id: number;
  name: string;
  lastname: string;
  email: string;
}

export default function Me({ id, name, lastname, email}: MeProps) {
    return (
      <div>
        <h2>Name: {name}</h2>
        <h2>Last Name: {lastname}</h2>
        <h2>Email: {email}</h2>
      </div>
    );
}