import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import AddBook from './AddBook';
import AddBookDetails from './AddBookDetails';
import { useApi } from '../../api/ApiProvider';
import { BookGridProps } from '../../book/book-grid/BookGrid';

const ManageBooks: React.FC = () => {
  const apiClient = useApi();

  const [allBookData, setBooks] = useState<BookGridProps | null>(null);

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

  return (
    <div>
      <div>
        <AddBook />
      </div>
      <div>
        <AddBookDetails books={books} />
      </div>
      <div>
        <BookList books={books} />
      </div>
    </div>
  );
};

export default ManageBooks;
