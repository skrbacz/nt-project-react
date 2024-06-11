import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useApi } from '../../api/ApiProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import ReviewForm from '../../review/ReviewForm/ReviewForm';
import { BookDetailsProps } from '../book-details/BookDetails';
import { BookProps } from '../Book';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoanProps } from '../../loan/Loan';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MeProps } from '../../me/Me';
import { useTranslation } from 'react-i18next';

//TODO: you need to get all reviews from all pages showing here doesnt matter what kolejnosc xoxo
//if available books ===0 button turned off "not avaliable"

interface BookDetailsModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    bookId: number;
    isbn: string;
    title: string;
    author: string;
    yearPublished: number;
    bookDetails: BookDetailsProps;
    available: boolean;
  };
}

interface Review {
  reviewId: number;
  userId: number;
  book: BookProps[];
  username: string;
  rating: number;
  comment: string;
  reviewDate: string;
}

export default function BookDetailsModal({
  open,
  onClose,
  book,
}: BookDetailsModalProps) {
  const apiClient = useApi();
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<MeProps | null>(null);
  const [isDatePicked, setIsDatePicked] = useState(false);
  const [isBookLoanedByUser, setIsBookLoanedByUser] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await apiClient.getReviewByBookId(book.bookId);
      setReviews(response.data['reviews'] || []);
    };
    if (open) {
      fetchReviews();
    }
  }, [open, apiClient, book]);

  useEffect(() => {
    const fetchUserAndLoans = async () => {
      const meData = await apiClient.getMe();
      setUser(meData.data);

      if (meData.data) {
        let currentPage = 0;
        let isBookLoaned = false;

        while (!isBookLoaned) {
          const loansResponse = await apiClient.getLoansOneUser(
            meData.data.userId,
            currentPage,
          );
          const loans = loansResponse.data?.loans || [];

          isBookLoaned = loans.some(
            (loan: LoanProps) =>
              loan.book.bookId === book.bookId && loan.returnDate === null,
          );

          if (!isBookLoaned && loansResponse.data?.hasMore) {
            currentPage++;
          } else {
            break;
          }
        }

        setIsBookLoanedByUser(isBookLoaned);
      }
    };

    if (open) {
      fetchUserAndLoans();
    }
  }, [open, apiClient, book]);

  if (!user) {
    return <div>{t('loading')}</div>;
  }

  const handleLoan = async () => {
    if (dueDate && user) {
      let currentPage = 0;
      let isLoanCreated = false;

      while (!isLoanCreated) {
        const loansResponse = await apiClient.getLoansOneUser(
          user.userId,
          currentPage,
        );
        const loans = loansResponse.data?.loans || [];

        isLoanCreated = loans.some(
          (loan: LoanProps) =>
            loan.book.bookId === book.bookId && loan.returnDate === null,
        );

        if (!isLoanCreated && loansResponse.data?.hasMore) {
          currentPage++;
        } else {
          break;
        }
      }
      if (!isLoanCreated) {
        await apiClient.postLoan(
          book.bookId,
          user.userId,
          dueDate.format('YYYY-MM-DD'),
        );
        await refreshLoanStatus();
      }
    }
  };

  const refreshLoanStatus = async () => {
    const meData = await apiClient.getMe();
    setUser(meData.data);

    if (meData.data) {
      let currentPage = 0;
      let isBookLoaned = false;

      while (!isBookLoaned) {
        const loansResponse = await apiClient.getLoansOneUser(
          meData.data.userId,
          currentPage,
        );
        const loans = loansResponse.data?.loans || [];

        isBookLoaned = loans.some(
          (loan: LoanProps) =>
            loan.book.bookId === book.bookId && loan.returnDate === null,
        );

        if (!isBookLoaned && loansResponse.data?.hasMore) {
          currentPage++;
        } else {
          break;
        }
      }

      setIsBookLoanedByUser(isBookLoaned);
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDueDate(date);
    setIsDatePicked(!!date);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    const response = await apiClient.getReviewByBookId(book.bookId);
    setReviews(response.data['reviews'] || []);
  };

  const handleDeleteReview = async (reviewId: number) => {
    const response = await apiClient.deleteReview(reviewId);
    if (response.success) {
      const updatedReviews = reviews.filter(
        (review) => review.reviewId !== reviewId,
      );
      setReviews(updatedReviews);
    } else {
      console.error('Failed to delete review');
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 111, 0)',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Typography variant="h5">{book.title}</Typography>
          <Typography marginLeft={2}>{t('author')}: {book.author}</Typography>
          <Typography marginLeft={2}>
            {t('yearPublished')}: {book.yearPublished}
          </Typography>
          <Typography marginLeft={2}>ISBN: {book.isbn}</Typography>
          <Typography marginLeft={2}>
            {t('genre')}: {book.bookDetails.genre}
          </Typography>
          <Typography marginLeft={2}>
            {t('summary')}: {book.bookDetails.summary}
          </Typography>
          <Typography marginLeft={2}>
            {t('available')}: {book.available ? t('availableYes') : t('availableNo') }
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '9px',
              marginTop: '20px',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={dueDate}
                onChange={(newValue) => handleDateChange(newValue)}
                label={t('selectDueDate')}
              />
            </LocalizationProvider>

            <Button
              onClick={handleLoan}
              variant="contained"
              sx={{
                backgroundColor: 'rgb(255, 111, 0)',
                color: '#fff',
                width: '50%',
                marginLeft: '10px',
              }}
              disabled={!isDatePicked || isBookLoanedByUser || !book.available}
            >
              {isBookLoanedByUser
                ? t('loaned')
                : book.available
                  ? t('loan')
                  : t('notAvaliable')}
            </Button>
          </div>
          <Typography variant="h6" marginTop={2}>
            {t('reviews')}
          </Typography>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              marginLeft: '12px',
            }}
          >
            {reviews.length === 0 ? (
              <Typography color="textSecondary">{t('noReviews')}</Typography>
            ) : (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography marginTop={1} marginLeft={2}>
                        {review.username} {t('ratedIt')}:{' '}
                      </Typography>
                      <Rating value={review.rating} readOnly />{' '}
                      {user.username === review.username ? (
                        <DeleteOutlineOutlinedIcon
                          onClick={() => handleDeleteReview(review.reviewId)}
                          style={{
                            cursor: 'pointer',
                            marginLeft: '5px',
                            color: 'red',
                          }}
                        />
                      ) : null}
                    </div>
                    <Typography marginLeft={3} marginTop={0.5} marginBottom={1}>
                      {review.comment}
                    </Typography>
                    <Typography
                      marginLeft={3}
                      marginTop={0.5}
                      marginBottom={1}
                      fontSize={12}
                    >
                      {review.reviewDate}
                    </Typography>
                    {index !== reviews.length - 1 && (
                      <div
                        style={{
                          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                          marginBottom: '10px',
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '20px', marginTop: '10px' }}>
            <ReviewForm
              onSubmit={handleReviewSubmit}
              userId={user.userId}
              bookId={book.bookId}
              apiClient={apiClient} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
