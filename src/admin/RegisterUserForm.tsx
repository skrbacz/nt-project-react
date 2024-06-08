import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Alert,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { UserRole } from './UserRole';
import { useApi } from '../api/ApiProvider';

interface RegistrationFormValues {
  username: string;
  password: string;
  role: UserRole; // Assuming UserRole is defined elsewhere
  email: string;
}

const initialValues: RegistrationFormValues = {
  username: '',
  password: '',
  role: UserRole.READER,
  email: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  role: Yup.string().required('Role is required'), // Assuming role is required
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      const response = await api.postRegister(
        values.username,
        values.password,
        values.role,
        values.email,
      );
      if (response.success) {
        alert('Registration successful!');
        setError(null);
      } else {
        setError('Failed to register user.');
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
          User Registration
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
                  name="username"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.username}
                  helperText={
                    touched.username && errors.username ? errors.username : ''
                  }
                  error={Boolean(touched.username && errors.username)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.password}
                  helperText={
                    touched.password && errors.password ? errors.password : ''
                  }
                  error={Boolean(touched.password && errors.password)}
                />
              </Box>
              <Box mb={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Field
                    name="role"
                    as={Select}
                    label="Role"
                    onChange={handleChange}
                    value={values.role}
                    error={Boolean(touched.role && errors.role)}
                  >
                    <MenuItem value="READER">Reader</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                  </Field>
                </FormControl>
              </Box>
              <Box mb={2}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email ? errors.email : ''}
                  error={Boolean(touched.email && errors.email)}
                />
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default RegistrationForm;
