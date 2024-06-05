import React from 'react';
import './Loan.css';
import { Card, CardContent, Typography } from '@mui/material';
import { BookProps } from '../book/Book';

export interface LoanProps {
  loanId: number;
  book: BookProps;
  loanDate: string;
  dueDate: string;
}

export default function Loan({
  loanId,
  book,
  loanDate,
  dueDate,
}: LoanProps) {
  return (
    <Card className="loan">
      <CardContent className="loan-text">
        <Typography>Loan id: {loanId}</Typography>
        <Typography>Title: {book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Year of publication: {book.yearPublished}</Typography>
        <Typography>Loan date: {loanDate}</Typography>
        <Typography>Due date: {dueDate}</Typography>
      </CardContent>
    </Card>
  );
}
