import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Book.css';
import { BookDetailsProps } from './book-details/BookDetails';
import { useTranslation } from 'react-i18next';

export interface BookProps {
  bookId: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  available: boolean;
  bookDetails: BookDetailsProps;
  availableBooks: number;
}

export default function Book({
  bookId,
  title,
  isbn,
  author,
  publisher,
  yearPublished,
  available,
  availableBooks,
  bookDetails,
}: BookProps) {
  const { t } = useTranslation();

  return (
    <Card className="book">
      <CardMedia
        component="img"
        height="200"
        width="150"
        image={bookDetails.coverImageUrl}
        alt={`Cover of the book titled ${title}`}
        className="book-image"
      />
      <CardContent
        className="book-info"
        sx={{ paddingTop: 1, paddingBottom: '9px' }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '2px',
            color: '#333',
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: '10px', color: '#666' }}>
          {author}, {yearPublished}
        </Typography>
      </CardContent>
    </Card>
  );
}
