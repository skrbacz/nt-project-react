import react from 'react';
import Grid from '@mui/material/Grid';
import Loan from '../loan/Loan';
import './LoansGrid.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface LoansGridProps {
  loans: {
    id: number;
    title: string;
    author: string;
    yearPublished: number;
    loanDate: string;
    dueDate: string;
  }[];
}

export default function LoansGrid({ loans }: LoansGridProps) {
  const [currentIndex, setCurrentIndex] = react.useState(0);

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
            id={loans[currentIndex].id}
            title={loans[currentIndex].title}
            author={loans[currentIndex].author}
            yearPublished={loans[currentIndex].yearPublished}
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
