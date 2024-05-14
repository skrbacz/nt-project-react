import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Book.css'; // Make sure this is your custom CSS file

interface BookProps {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
  photo: string;
  avaliableCopies: number;
}

export default function Book({ id, title, author, yearPublished, photo, avaliableCopies }: BookProps) {
  return (
    <Card className="book">
      <CardMedia
        component="img"
        height="200"
        width="150"
        image={photo}
        alt={'Cover of the book titled ${title}'}
        className="book-image"
      />
      <CardContent className="book-details">
        <Typography className="book-title">{title}</Typography>
        <Typography className="book-details-text">
          by {author}, {yearPublished}
        </Typography>
      </CardContent>
    </Card>
  );
}
