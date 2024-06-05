import Grid from '@mui/material/Grid';
import './LoansGrid.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useApi } from '../../api/ApiProvider';
import Loan, { LoanProps } from '../Loan';
import { useEffect, useState } from 'react';

interface LoansGridProps {
  loans: LoanProps[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export default function LoansGrid({ userId }: { userId: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiClient = useApi();
  const [allLoansData, setLoans] = useState<LoansGridProps | null>(null);

  useEffect(() => {
    const fetchUserLoans = async () => {
      const loansData = await apiClient.getLoansOneUser(userId);
      console.log(loansData.data);
      setLoans(loansData.data);
    };
    fetchUserLoans();
  }, [apiClient, userId]);

  if (!allLoansData) {
    return <div>Loading...</div>;
  }

  const loans = allLoansData!.loans;
  console.log('loans:', loans);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < loans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="my-loans-text">
        <Typography variant="h5">List of my loans</Typography>
      </div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Loan
            loanId={loans[currentIndex].loanId}
            book={loans[currentIndex].book}
            loanDate={loans[currentIndex].loanDate}
            dueDate={loans[currentIndex].dueDate}
          />
        </Grid>
      </Grid>
      <div className="button-container">
        <Button disabled={currentIndex === 0} onClick={handlePrevClick}>
          Previous
        </Button>
        <Button
          disabled={currentIndex === loans.length - 1}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
