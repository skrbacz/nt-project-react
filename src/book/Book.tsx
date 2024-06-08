import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Book.css'; // Make sure this is your custom CSS file
import BookDetails, {BookDetailsProps} from './book-details/BookDetails';

export interface BookProps {
  bookId: number,
  title: string,
  author: string,
  yearPublished: number,
  bookDetails: BookDetailsProps,
  available: boolean
}

export default function Book({ bookId, title, author, yearPublished, available, bookDetails }: BookProps) {
  return (
    <Card className="book">
      <CardMedia
        component="img"
        height="200"
        width="150"
        image={bookDetails.coverImageUrl}
        alt={'Cover of the book titled ${title}'}
        className="book-image"
      />
      <CardContent className="book-info">
      <Typography className=".book-title">{title}</Typography>
        <Typography className=".book-info-author-year">
          by {author}, {yearPublished}
        </Typography>
      </CardContent>
    </Card>
  );
}
