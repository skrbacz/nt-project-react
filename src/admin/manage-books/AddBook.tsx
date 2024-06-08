import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Container, Alert, ThemeProvider, createTheme } from '@mui/material';
import { useApi } from '../../api/ApiProvider';

interface BookFormValues {
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

const validationSchema = Yup.object({
  isbn: Yup.string().required('ISBN is required'),
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  publisher: Yup.string().required('Publisher is required'),
  yearPublished: Yup.number().required('Year Published is required').min(0, 'Year must be a positive number'),
  availableCopies: Yup.number().required('Available Copies is required').min(0, 'Copies must be a positive number'),
});



const AddBookForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const clientApi= useApi();

  const handleSubmit = async (values: BookFormValues) => {
    const response = await clientApi.postBook(values.isbn, values.title, values.author, values.publisher, values.yearPublished, values.availableCopies);
    if (response.success) {
      alert('Book added successfully!');
      setError(null);
    } else {
      if (response.statusCode === 409) {
        setError('A book with this ISBN already exists.');
      } else {
        setError('Failed to add book.');
      }
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 111, 0)',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Add a Book
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, handleChange, values, touched, errors }) => (
            <Form>
              <Box mb={2}>
                <Field
                  name="isbn"
                  as={TextField}
                  label="ISBN"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.isbn}
                  helperText={touched.isbn && errors.isbn ? errors.isbn : ''}
                  error={Boolean(touched.isbn && errors.isbn)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.title}
                  helperText={touched.title && errors.title ? errors.title : ''}
                  error={Boolean(touched.title && errors.title)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="author"
                  as={TextField}
                  label="Author"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.author}
                  helperText={touched.author && errors.author ? errors.author : ''}
                  error={Boolean(touched.author && errors.author)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="publisher"
                  as={TextField}
                  label="Publisher"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.publisher}
                  helperText={touched.publisher && errors.publisher ? errors.publisher : ''}
                  error={Boolean(touched.publisher && errors.publisher)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="yearPublished"
                  as={TextField}
                  label="Year Published"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.yearPublished}
                  helperText={touched.yearPublished && errors.yearPublished ? errors.yearPublished : ''}
                  error={Boolean(touched.yearPublished && errors.yearPublished)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="availableCopies"
                  as={TextField}
                  label="Available Copies"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.availableCopies}
                  helperText={touched.availableCopies && errors.availableCopies ? errors.availableCopies : ''}
                  error={Boolean(touched.availableCopies && errors.availableCopies)}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Add a Book
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default AddBookForm;