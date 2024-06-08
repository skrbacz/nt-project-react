import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Container, Alert, ThemeProvider, createTheme } from '@mui/material';
import { useApi } from '../../api/ApiProvider';

interface AddBookDetailsFormValues {
  coverImageURL: string;
  genre: string;
  summary: string;
}

const initialValues: AddBookDetailsFormValues = {
  coverImageURL: '',
  genre: '',
  summary: '',
};

interface AddBookForm{
  books: []
}

const validationSchema = Yup.object({
  coverImageURL: Yup.string().required('Cover Image URL is required'),
  genre: Yup.string().required('Genre is required'),
  summary: Yup.string().required('Summary is required'),
});

const AddBookForm: React.FC = ({books}) => {
  const [error, setError] = useState<string | null>(null);
  const clientApi = useApi();

  const handleSubmit = async (values: AddBookDetailsFormValues) => {
    try {
      // Adjust the API call according to your actual implementation
      const response = await clientApi.patchBookDetials(values.coverImageURL, values.genre, values.summary);
      if (response.success) {
        alert('Book added successfully!');
        setError(null);
      } else {
        setError('Failed to add book.');
      }
    } catch (error) {
      setError('Unexpected error occurred.');
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
          Add Book Details
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
                  name="coverImageURL"
                  as={TextField}
                  label="Cover Image URL"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.coverImageURL}
                  helperText={touched.coverImageURL && errors.coverImageURL ? errors.coverImageURL : ''}
                  error={Boolean(touched.coverImageURL && errors.coverImageURL)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="genre"
                  as={TextField}
                  label="Genre"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.genre}
                  helperText={touched.genre && errors.genre ? errors.genre : ''}
                  error={Boolean(touched.genre && errors.genre)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="summary"
                  as={TextField}
                  label="Summary"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                  value={values.summary}
                  helperText={touched.summary && errors.summary ? errors.summary : ''}
                  error={Boolean(touched.summary && errors.summary)}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Add Book
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default AddBookForm;
