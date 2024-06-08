import React from 'react';
import './Loan.css';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { BookProps } from '../book/Book';
import { useApi } from '../api/ApiProvider';

export interface LoanProps {
  loanId: number;
  book: BookProps;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  onReturn: () => void; // Add this line
}

export default function Loan({
  loanId,
  book,
  loanDate,
  dueDate,
  returnDate,
  onReturn, // Add this line
}: LoanProps) {
  const clientApi = useApi();

  const handleReturn = async () => {
    try {
      console.log(loanId);
      await clientApi.patchLoanReturnBook(loanId);
      onReturn(); // Notify parent component
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <Card className="loan">
      <CardContent className="loan-text">
        <Typography>Loan id: {loanId}</Typography>
        <Typography>Title: {book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Year of publication: {book.yearPublished}</Typography>
        <Typography>Loan date: {loanDate}</Typography>
        <Typography>Due date: {dueDate}</Typography>
        <div style={{ marginTop: '10px' }}>
          {returnDate ? (
            <Button variant="outlined" disabled>
              Returned
            </Button>
          ) : (
            <Button
              onClick={handleReturn}
              variant="outlined"
              style={{
                color: 'rgb(255, 111, 0)',
                borderColor: 'rgb(255, 111, 0)',
              }}
            >
              Return
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
