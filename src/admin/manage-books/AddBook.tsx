import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Container, Alert, ThemeProvider, createTheme } from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { useTranslation } from 'react-i18next';

export interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
}

const initialValues: BookFormValues = {
  isbn: '',
  title: '',
  author: '',
  publisher: '',
  yearPublished: 0,
  availableCopies: 0,
};



interface AddBookProps {
  onAddBook: () => void;
}

const AddBookForm: React.FC<AddBookProps> = ({ onAddBook }) => {
  const [error, setError] = useState<string | null>(null);
  const clientApi = useApi();
  const {t} = useTranslation();

  const handleSubmit = async (values: BookFormValues, { resetForm }: { resetForm: () => void }) => {
    const response = await clientApi.postBook(
      values.isbn,
      values.title,
      values.author,
      values.publisher,
      values.yearPublished,
      values.availableCopies
    );
    if (response.success) {
      alert(t('bookAddedSuccessfully'));
      setError(null);
      resetForm(); 
      onAddBook();
    } else {
      if (response.statusCode === 409) {
        setError(t('isbnDuplicate'));
      } else {
        setError(t('bookAddFail'));
      }
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          {t('addABook')}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            isbn: Yup.string().required(t('isbnReq')),
            title: Yup.string().required(t('titleReq')),
            author: Yup.string().required(t('authorReq')),
            publisher: Yup.string().required(t('publisherReq')),
            yearPublished: Yup.number()
              .required(t('yearPublishedReq'))
              .min(0, t('yearPositiveReq')),
            availableCopies: Yup.number()
              .required(t('availableCopiesReq'))
              .min(0, t('copiesPositiveReq')),
          })}
          onSubmit={handleSubmit}
        >
          {({ isValid, handleChange, values, touched, errors }) => (
            <Form>
              <Field
                name="isbn"
                as={TextField}
                label="ISBN"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.isbn}
                helperText={touched.isbn && errors.isbn ? errors.isbn : ''}
                error={Boolean(touched.isbn && errors.isbn)}
              />

              <Field
                name="title"
                as={TextField}
                label= {t('title')}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.title}
                helperText={touched.title && errors.title ? errors.title : ''}
                error={Boolean(touched.title && errors.title)}
              />

              <Field
                name="author"
                as={TextField}
                label={t('author')}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.author}
                helperText={
                  touched.author && errors.author ? errors.author : ''
                }
                error={Boolean(touched.author && errors.author)}
              />

              <Field
                name="publisher"
                as={TextField}
                label={t('publisher')}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.publisher}
                helperText={
                  touched.publisher && errors.publisher ? errors.publisher : ''
                }
                error={Boolean(touched.publisher && errors.publisher)}
              />

              <Field
                name="yearPublished"
                as={TextField}
                label={t('yearPublished')}
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.yearPublished}
                helperText={
                  touched.yearPublished && errors.yearPublished
                    ? errors.yearPublished
                    : ''
                }
                error={Boolean(touched.yearPublished && errors.yearPublished)}
              />

              <Field
                name="availableCopies"
                as={TextField}
                label={t('availableCopies')}
                variant="outlined"
                type="number"
                margin="normal"
                fullWidth
                onChange={handleChange}
                value={values.availableCopies}
                helperText={
                  touched.availableCopies && errors.availableCopies
                    ? errors.availableCopies
                    : ''
                }
                error={Boolean(
                  touched.availableCopies && errors.availableCopies
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                {t('addABook')}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default AddBookForm;
