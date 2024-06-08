import React from 'react';
import { Rating, Typography } from '@mui/material';

interface ReviewProps {
  userId: number;
  bookId: number;
  rating: number;
  comment: string;
  reviewDate:string;
}

export default function Review({ userId, bookId, rating, comment, reviewDate }: ReviewProps) {
  return (
    <div>
      <Rating name="read-only" value={rating} readOnly />
      <Typography>Comment: {comment}</Typography>
    </div>
  );
}
