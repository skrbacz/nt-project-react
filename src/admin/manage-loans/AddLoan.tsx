import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  ThemeProvider,
  createTheme,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { BookProps } from '../../book/Book';
import { MeProps } from '../../me/Me';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface LoanFormValues {
  userId: number;
  bookId: number;
  dueDate: string;
}

const initialValues: LoanFormValues = {
  userId: 0,
  bookId: 0,
  dueDate: '',
};

interface AddLoanProps {
  onAddLoan: () => void;
}

const AddLoan: React.FC<AddLoanProps> = ({ onAddLoan }) => {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<MeProps[]>([]);
  const [books, setBooks] = useState<BookProps[]>([]);
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const clientApi = useApi();
  const navigate = useNavigate();


  const fetchUsers = async () => {
    try {
      let allUsersData: MeProps[] = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore) {
        const usersData = await clientApi.getUsers(currentPage);
        const users = usersData.data?.users || [];
        allUsersData = allUsersData.concat(users);
        hasMore = usersData.data?.hasMore || false;
        currentPage++;
      }

      setUsers(allUsersData);
    } catch (error) {
      console.error(t('errorFetchingUsers'), error);
    }
  };

  const fetchBooks = async () => {
    try {
      let allBooksData: BookProps[] = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore) {
        const booksData = await clientApi.getBooks(currentPage);
        const books = booksData.data?.books || [];
        allBooksData = allBooksData.concat(books);
        hasMore = booksData.data?.hasMore || false;
        currentPage++;
      }

      setBooks(allBooksData);
    } catch (error) {
      console.error(t('errorFetchingBooks'), error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchBooks();
      setLoading(false);
    };
    fetchData();
  }, [clientApi]);
  const handleSubmit = async (
    values: LoanFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    const response = await clientApi.postLoan(
      values.bookId,
      values.userId,
      values.dueDate,
    );
    if (response.success) {
      alert(t('loanAddedSuccessfully'));
      setError(null);
      resetForm();
      onAddLoan();
    } else {
      setError(t('loanAddFail'));
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 111, 0)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
    },
  });

  const handleDateChange = (newValue: Dayjs | null) => {
    setDueDate(newValue);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          {t('addLoan')}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={{
            ...initialValues,
            dueDate: dueDate?.format('YYYY-MM-DD') || '',
          }}
          validationSchema={Yup.object({
            userId: Yup.number().required(t('userReq')),
            bookId: Yup.number().required(t('bookReq')),
            dueDate: Yup.string().required(t('dueDateReq')),
          })}
          onSubmit={handleSubmit}
        >
          {({ isValid, setFieldValue, values, touched, errors }) => (
            <Form>
              {users.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  {t('noUsersYet')}
                </Typography>
              ) : (
                <Field
                  as={TextField}
                  select
                  name="userId"
                  label={t('selectUser')}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={(e: SelectChangeEvent<number>) =>
                    setFieldValue('userId', e.target.value)
                  }
                  value={values.userId}
                  helperText={
                    touched.userId && errors.userId ? errors.userId : ''
                  }
                  error={Boolean(touched.userId && errors.userId)}
                >
                  {users.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Field>
              )}

              {books.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  {t('noBooksYet')}
                </Typography>
              ) : (
                <Field
                  as={TextField}
                  select
                  name="bookId"
                  label={t('selectBook')}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={(e: SelectChangeEvent<number>) =>
                    setFieldValue('bookId', e.target.value)
                  }
                  value={values.bookId}
                  helperText={
                    touched.bookId && errors.bookId ? errors.bookId : ''
                  }
                  error={Boolean(touched.bookId && errors.bookId)}
                >
                  {books.map((book) => (
                    <MenuItem key={book.bookId} value={book.bookId}>
                      {book.title} by {book.author}
                    </MenuItem>
                  ))}
                </Field>
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label={t('selectDueDate')}
                  value={dueDate}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                    setFieldValue('dueDate', newValue?.format('YYYY-MM-DD'));
                  }}
                />
              </LocalizationProvider>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
                disabled={!isValid}
              >
                {t('addLoan')}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default AddLoan;
