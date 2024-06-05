import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useApi } from '../../api/ApiProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { BookDetailsProps } from '../book-details/BookDetails';

interface BookDetailsModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    bookId: number,
  title: string,
  author: string,
  yearPublished: number,
  bookDetails: BookDetailsProps,
  available: boolean
  };
}

interface MeProps {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  userRole: string;
}

export default function BookDetailsModal({
  open,
  onClose,
  book
}: BookDetailsModalProps) {
  const apiClient = useApi();
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);

  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await apiClient.getReviewByBookId(book.bookId);
      setReviews(Array.isArray(response.data) ? response.data : []);
    };
    if (open) {
      fetchReviews();
    }
  }, [open, apiClient, book]);

  const [user, setUser] = useState<MeProps | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const meData = await apiClient.getMe();
      console.log(meData.data);
      setUser(meData.data);
    };
    fetchBooks();
  }, [apiClient]);

  if (!user) {
    return <div>Loading...</div>;
  }


  const handleLoan = () => {
    if (dueDate && user) {
      apiClient.postLoan(book.bookId, user.userId, dueDate.toDate());
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDueDate(date);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<unknown>,
    value: number | null,
  ) => {
    setNewReview({ ...newReview, rating: value || 0 });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({ ...newReview, comment: event.target.value });
  };

  const handleAddReview = async () => {
    if (user) {
      await apiClient.postReview(
        book.bookId,
        user.userId,
        newReview.rating,
        newReview.comment,
      );
      const response = await apiClient.getReviewByBookId(book.bookId);
      setReviews(response.data);
      setNewReview({ rating: 0, comment: '' });
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Year of Publication: {book.yearPublished}</Typography>
        <Typography>Available: {book.available ? 'Yes' : 'No'}</Typography>

        <Typography variant="h6">Reviews</Typography>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {reviews.map((review, index) => (
            <div key={index}>
              <Typography>Rating: {review.rating}</Typography>
              <Typography>{review.comment}</Typography>
            </div>
          ))}
        </div>

        <Typography variant="h6">Add Review</Typography>
        <Rating
          name="rating"
          value={newReview.rating}
          onChange={handleRatingChange}
        />
        <TextField
          label="Comment"
          value={newReview.comment}
          onChange={handleCommentChange}
        />
        <Button onClick={handleAddReview}>Submit Review</Button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={dueDate}
            onChange={(newValue) => handleDateChange(newValue)}
            label="Select Due Date"
          />
        </LocalizationProvider>

        <Button onClick={handleLoan}>Loan</Button>
      </DialogContent>
    </Dialog>
  );
}
