import React from 'react';
import { BookProps } from '../../book/Book';
import { useApi } from '../../api/ApiProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BookScrollableListProps {
  books: BookProps[];
  onDeleteBook: () => void;
}

const BookScrollableList: React.FC<BookScrollableListProps> = ({
  books,
  onDeleteBook,
}) => {
  const clientApi = useApi();
  const {t} = useTranslation();

  const handleDelete = async (bookId: number) => {
    const response = await clientApi.deleteBook(bookId);
    if (response.success) {
      onDeleteBook();
    } else {
      alert(t('errorDeletingBook') + " " + response.statusCode);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('bookList')}
      </Typography>
      <List sx={{ overflow: 'auto', maxHeight: 400 }}>
        {books.map((book, index) => (
          <React.Fragment key={book.bookId}>
            <ListItem>
              <ListItemIcon>
                <IconButton onClick={() => handleDelete(book.bookId)}>
                  <DeleteOutlineOutlinedIcon
                    style={{
                      cursor: 'pointer',
                      marginLeft: '5px',
                      color: 'red',
                    }}
                  />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={book.title}
                secondary={t('author') +": " +book.author + ", " + t('ISBN') + ": " + book.isbn + ", " + t('publisher') + ": " + book.publisher + ", " + t('yearPublished') + ": " +book.yearPublished + ", " + t('genre') + ": " + book.bookDetails.genre + ", " + t('summary') + ": " + book.bookDetails.summary + ", "+ t('coverImageUrl') + ": "  + (book.bookDetails.coverImageUrl === t('noImage') ? book.bookDetails.coverImageUrl : t('present')) + ", " + t('availableCopies') + ": " + book.availableBooks}
              />
            </ListItem>
            {index < books.length - 1 && <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />} 
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default BookScrollableList;
