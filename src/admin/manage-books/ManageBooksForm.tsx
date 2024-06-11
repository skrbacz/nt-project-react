import React, { useEffect, useState } from 'react';

import AddBookDetails from './AddBookDetails';
import { useApi } from '../../api/ApiProvider';
import { BookProps } from '../../book/Book';
import { Box } from '@mui/material';
import AddBookForm from './AddBook';
import BookScrollableList from './BookList';
import { useNavigate } from 'react-router-dom';

const ManageBooks: React.FC = () => {
  const apiClient = useApi();
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState<BookProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    fetchBooks();
  }, [apiClient]);

  const handleBookListChange = () => {
    fetchBooks();
  };

  if (loading) {
    navigate('login')
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Box mb={2}>
          <AddBookForm onAddBook={handleBookListChange} />
        </Box>
      </div>
      <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', margin: '10px 0' }} />
      <div>
        <Box mb={2}>
          <AddBookDetails books={allBooks} onPatchBookDetails={handleBookListChange} />
        </Box>
      </div>
      <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', margin: '10px 0' }} />
      <div>
        <Box mb={2}>
          <BookScrollableList books={allBooks} onDeleteBook={handleBookListChange} />
        </Box>
      </div>
    </div>
  );
};

export default ManageBooks;
