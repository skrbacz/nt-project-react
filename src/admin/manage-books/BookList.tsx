// BookList.tsx
import React from 'react';

const BookList: React.FC = () => {
  const books = [
    // Sample book data (replace with actual data)
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
  ];

  const handleDelete = (id: number) => {
    // Handle book deletion
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
