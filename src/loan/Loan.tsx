import React from 'react';
import './Loan.css';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { BookProps } from '../book/Book';
import { useApi } from '../api/ApiProvider';
import { MeProps } from '../me/Me';
import { useTranslation } from 'react-i18next';

export interface LoanProps {
  loanId: number;
  book: BookProps;
  user: MeProps;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  onReturn: () => void; // Add this line
}

export default function Loan({
  loanId,
  book,
  user,
  loanDate,
  dueDate,
  returnDate,
  onReturn, // Add this line
}: LoanProps) {
  const clientApi = useApi();

  const {t}= useTranslation();

  const handleReturn = async () => {
    try {
      console.log(loanId);
      await clientApi.patchLoanReturnBook(loanId);
      onReturn(); 
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <Card className="loan">
      <CardContent className="loan-text">
        <Typography>{t('loanId')}: {loanId}</Typography>
        <Typography>{t('title')}: {book.title}</Typography>
        <Typography>{t('author')}: {book.author}</Typography>
        <Typography>{t('yearPublished')}: {book.yearPublished}</Typography>
        <Typography>{t('loanDate')}: {loanDate}</Typography>
        <Typography>{t('dueDate')}: {dueDate}</Typography>
        <div style={{ marginTop: '10px' }}>
          {returnDate ? (
            <Button variant="outlined" disabled>
              {t('returned')}
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
              {t('return')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
