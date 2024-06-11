import React from 'react';
import { Rating, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ReviewProps {
  userId: number;
  bookId: number;
  rating: number;
  comment: string;
  reviewDate:string;
}

export default function Review({ userId, bookId, rating, comment, reviewDate }: ReviewProps) {
  const { t } = useTranslation();

  return (
    <div>
      <Rating name="read-only" value={rating} readOnly />
      <Typography>{t('comment')}: {comment}</Typography>
    </div>
  );
}
