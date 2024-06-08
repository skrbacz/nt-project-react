import React, { useState } from 'react';
import { Rating, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApi } from '../../api/ApiProvider';

interface ReviewFormProps {
  userId: number;
  bookId: number;
  onSubmit: (rating: number, comment: string) => Promise<void>; 
  apiClient: ReturnType<typeof useApi>; 
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  userId,
  bookId,
  onSubmit,
  apiClient,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async () => {
    if (rating !== null && comment.trim()) {
      await apiClient.postReview(bookId, userId, rating, comment);
      await onSubmit(rating, comment); 
      setRating(null);
      setComment('');
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
      <div>
        <Typography fontSize={16} marginBottom={-0.5}>Leave a Review</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          label="Short comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ backgroundColor: 'rgb(255, 111, 0)', color: '#fff' }}
        >
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default ReviewForm;
