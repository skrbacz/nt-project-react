import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import Loan, { LoanProps } from '../Loan';
import { useTranslation } from 'react-i18next';

interface LoansGridProps {
  userId: number;
}

export default function LoansGrid({ userId }: LoansGridProps) {
  const [loans, setLoans] = useState<LoanProps[]>([]);
  const [sortedLoans, setSortedLoans] = useState<LoanProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { t } = useTranslation();

  const apiClient = useApi();

  const fetchAllUserLoans = async () => {
    try {
      let allLoans: LoanProps[] = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore) {
        const loansResponse = await apiClient.getLoansOneUser(
          userId,
          currentPage,
        );
        const loans = loansResponse.data?.loans || [];
        allLoans = allLoans.concat(loans);
        hasMore = loansResponse.data?.hasMore || false;
        currentPage++;
      }

      const sorted = allLoans.sort((a: LoanProps, b: LoanProps) => {
        if (a.returnDate === null && b.returnDate !== null) return -1;
        if (a.returnDate !== null && b.returnDate === null) return 1;
        return b.loanId - a.loanId;
      });

      setLoans(sorted);
      setSortedLoans(sorted);
    } catch (error) {
      console.error('Error fetching user loans:', error);
    }
  };

  useEffect(() => {
    fetchAllUserLoans();
  }, [apiClient, userId]);

  const handleNextClick = () => {
    if (currentIndex < sortedLoans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 111, 0)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Typography variant="h5">{t('listOfMyLoans')}</Typography>
        </Box>
        {sortedLoans.length === 0 ? (
          <div>{t('noLoansMessage')}</div>
        ) : (
          <div>
            <Loan
              loanId={sortedLoans[currentIndex].loanId}
              book={sortedLoans[currentIndex].book}
              user={sortedLoans[currentIndex].user}
              loanDate={sortedLoans[currentIndex].loanDate}
              dueDate={sortedLoans[currentIndex].dueDate}
              returnDate={sortedLoans[currentIndex].returnDate}
              onReturn={fetchAllUserLoans} // Pass the callback function
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              <Button
                disabled={currentIndex === 0}
                onClick={handlePrevClick}
                style={{
                  color: currentIndex === 0 ? 'gray' : 'rgb(255, 111, 0)',
                  borderColor: currentIndex === 0 ? 'gray' : 'rgb(255, 111, 0)',
                }}
              >
                {t('previous')}
              </Button>
              <Typography variant="body1" mx={2}>
                {currentIndex + 1} of {sortedLoans.length}
              </Typography>
              <Button
                disabled={currentIndex === sortedLoans.length - 1}
                onClick={handleNextClick}
                style={{
                  color:
                    currentIndex === sortedLoans.length - 1
                      ? 'gray'
                      : 'rgb(255, 111, 0)',
                  borderColor:
                    currentIndex === sortedLoans.length - 1
                      ? 'gray'
                      : 'rgb(255, 111, 0)',
                }}
              >
                {t('next')}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
