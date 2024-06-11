import React, { useState } from 'react';
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
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { BookProps } from '../../book/Book';
import { useTranslation } from 'react-i18next';

export interface AddBookDetailsValues {
  coverImageURL: string;
  genre: string;
  summary: string;
  selectedBookId: number;
}

const initialValues: AddBookDetailsValues = {
  coverImageURL: '',
  genre: '',
  summary: '',
  selectedBookId: 0,
};

interface AddBookDetailsProps {
  books: BookProps[];
  onPatchBookDetails: () => void;
}


const AddBookDetails: React.FC<AddBookDetailsProps> = ({
  books,
  onPatchBookDetails,
}) => {

  const {t} = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const clientApi = useApi();

  const handleSubmit = async (
    values: AddBookDetailsValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      console.log(values.selectedBookId);
      const response = await clientApi.patchBookDetials(
        values.selectedBookId,
        values.genre,
        values.summary,
        values.coverImageURL,
      );
      if (response.success) {
        alert(t('bookDetailsAddedSuccessfully'));
        setError(null);
        resetForm(); 
        onPatchBookDetails();
      } else {
        alert(t('addBookDetailsFail'));
      }
    } catch (error) {
      alert(t('unexpectedError') + error);
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

  const filteredBooks = books.filter(
    (book) =>
      !book.bookDetails.coverImageUrl &&
      !book.bookDetails.genre &&
      !book.bookDetails.summary,
  );
  console.log(filteredBooks);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          {t('addBookDetails')}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            coverImageURL: Yup.string().required(t('coverImgReq')),
            genre: Yup.string().required(t('genreReq')),
            summary: Yup.string().required(t('summaryReq')),
            selectedBookId: Yup.number().required(t('selectBookReq')),
          })}
          onSubmit={handleSubmit}
        >
          {(
            { isValid, setFieldValue, values, touched, errors, resetForm }, // Provide resetForm function
          ) => (
            <Form>
              <Field
                as={TextField}
                select
                name="selectedBookId"
                label={t('selectBook')}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e: SelectChangeEvent<number>) =>
                  setFieldValue('selectedBookId', e.target.value)
                }
                value={values.selectedBookId}
                helperText={
                  touched.selectedBookId && errors.selectedBookId
                    ? errors.selectedBookId
                    : ''
                }
                error={Boolean(touched.selectedBookId && errors.selectedBookId)}
              >
                {filteredBooks.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    {t('everyBookHasDetails')}
                  </Typography>
                ) : (
                  filteredBooks.map((book) => (
                    <MenuItem key={book.bookId} value={book.bookId}>
                      {book.title} - {book.author}
                    </MenuItem>
                  ))
                )}
              </Field>
              <Field
                name="coverImageURL"
                as={TextField}
                margin="normal"
                label={t('coverImageURL')}
                variant="outlined"
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue('coverImageURL', e.target.value)
                }
                value={values.coverImageURL}
                helperText={
                  touched.coverImageURL && errors.coverImageURL
                    ? errors.coverImageURL
                    : ''
                }
                error={Boolean(touched.coverImageURL && errors.coverImageURL)}
              />

              <Field
                name="genre"
                as={TextField}
                label={t('genre')}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue('genre', e.target.value)
                }
                value={values.genre}
                helperText={touched.genre && errors.genre ? errors.genre : ''}
                error={Boolean(touched.genre && errors.genre)}
              />

              <Field
                name="summary"
                as={TextField}
                label={t('summary')}
                variant="outlined"
                fullWidth
                multiline
                margin="normal"
                rows={4}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue('summary', e.target.value)
                }
                value={values.summary}
                helperText={
                  touched.summary && errors.summary ? errors.summary : ''
                }
                error={Boolean(touched.summary && errors.summary)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                {t('addBookDetails')}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default AddBookDetails;
