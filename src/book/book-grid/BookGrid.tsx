import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './BookGrid.css';
import Typography from '@mui/material/Typography';
import Book, { BookProps } from '../Book';
import { useApi } from '../../api/ApiProvider';
import BookDetailsModal from '../popup/BookPopUp';
import { useTranslation } from 'react-i18next';

export interface BookGridProps {
  books: BookProps[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export default function BookGrid() {
  const apiClient = useApi();

  const [selectedBook, setSelectedBook] = useState<BookProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [books, setAllBooks] = useState<BookProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let allBooksData: BookProps[] = [];
        let currentPage = 0;
        let hasMore = true;

        while (hasMore) {
          const booksData = await apiClient.getBooks(currentPage);
          const books = booksData.data?.books || [];
          allBooksData = allBooksData.concat(books);
          hasMore = booksData.data?.hasMore || false;
          currentPage++;
        }

        setAllBooks(allBooksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiClient]);

  const { t } = useTranslation();


  if (loading) {
    return <div>{t('loading')}</div>;
  }

  const handleBookClick = (book: BookProps) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="list-of-books-text">
        <Typography variant="h5">{t('listOfBooks')}</Typography>
      </div>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book.bookId} xs={2} sm={2} md={2}>
            <div
              className="book-container"
              onClick={() => handleBookClick(book)}
            >
              <Book
                bookId={book.bookId}
                isbn={book.isbn}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                yearPublished={book.yearPublished}
                bookDetails={book.bookDetails}
                available={book.available}
                availableBooks={book.availableBooks}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      {selectedBook && (
        <BookDetailsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          book={selectedBook}
        />
      )}
    </div>
  );
}
