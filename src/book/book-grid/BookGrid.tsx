import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './BookGrid.css';
import Typography from '@mui/material/Typography';
import Book, { BookProps } from '../Book';
import { useApi } from '../../api/ApiProvider';
import BookDetailsModal from '../popup/BookPopUp';

interface BookGridProps {
  books: BookProps[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export default function BookGrid() {
  const apiClient = useApi();

  const [allBookData, setBooks] = useState<BookGridProps | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await apiClient.getBooks();
      console.log(booksData.data);
      setBooks(booksData.data);
    };
    fetchBooks();
  }, [apiClient]);

  if (!allBookData) {
    return <div>Loading...</div>;
  }

  const books = allBookData!.books;
  console.log('books:', books);

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
        <Typography variant="h5">List of books</Typography>
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
                title={book.title}
                author={book.author}
                yearPublished={book.yearPublished}
                bookDetails={book.bookDetails}
                available={book.available}
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
