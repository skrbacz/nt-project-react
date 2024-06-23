import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  Container,
  Box,
  Typography,
} from '@mui/material';
import { UserRole } from '../UserRole';
import { useApi } from '../../api/ApiProvider';
import { useTranslation } from 'react-i18next';

interface FormData {
  username: string;
  password: string;
  role: UserRole;
  email: string;
}

interface RegisterUserFormProps{
  onRegisterUser: () => void;
}

const RegisterUserForm: React.FC<RegisterUserFormProps> = ({onRegisterUser}) => {
  const {t}= useTranslation();

  const apiClient = useApi();

  const handleSubmit = async (values: FormData, {resetForm}: {resetForm: () => void}) => {
    try {
      const response = await apiClient.postRegister(
        values.username,
        values.password,
        values.role,
        values.email,
      );
      if (response.success) {
        alert(t('userRegistered'));
        resetForm();
        onRegisterUser();
      } else {
        if (response.statusCode === 409) {
          alert(t('userErrorUsernameEmail'));
        } else {
          console.error(t('errorRegisteringUser') + response.statusCode);
          alert(t('errorRegisteringUser') + response.statusCode);
        }
      }
    } catch (error) {
      console.error(t('unexpectedError'), error);
      alert(t('unexpectedError')+ error);
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
          {t('registerNewUser')}
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
            role: UserRole.READER,
            email: '',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(t('usernameReq')),
            password: Yup.string().required(t('passwordReq')).min(5, t('passwordTooShort')),
            role: Yup.string().required(t('roleReq')),
            email: Yup.string()
              .email(t('emailInvalid'))
              .required(t('emailReq')),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form style={{ textAlign: 'center' }}>
              <Field name="username">
                {({ field, form }: FieldProps<string>) => (
                  <TextField
                    {...field}
                    label={t('username')}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    style={{
                      borderColor: isValid ? 'rgb(255, 111, 0)' : undefined,
                      color: isValid ? 'rgb(255, 111, 0)' : undefined,
                    }}
                    error={
                      form.touched.username && Boolean(form.errors.username)
                    }
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps<string>) => (
                  <TextField
                    {...field}
                    label={t('password')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    style={{
                      borderColor: 'rgb(255, 111, 0)',
                      color: 'rgb(255, 111, 0)',
                    }}
                    error={
                      form.touched.password && Boolean(form.errors.password)
                    }
                  />
                )}
              </Field>
              <Field name="role">
                {({ field, form }: FieldProps<UserRole>) => (
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="role">{t('role')}</InputLabel>
                    <Select
                      {...field}
                      inputProps={{ id: 'role' }}
                      label={t('role')}
                      error={form.touched.role && Boolean(form.errors.role)}
                    >
                      <MenuItem value={UserRole.READER}>Reader</MenuItem>
                      <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: FieldProps<string>) => (
                  <TextField
                    {...field}
                    label={t('email')}
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    style={{
                      borderColor: isValid ? 'rgb(255, 111, 0)' : undefined,
                      color: isValid ? 'rgb(255, 111, 0)' : undefined,
                    }}
                    error={form.touched.email && Boolean(form.errors.email)}
                  />
                )}
              </Field>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: isValid ? 'rgb(255, 111, 0)' : '#FFF',
                  color: isValid ? '#fff' : 'rgb(255, 111, 0)',
                }}
                disabled={isSubmitting || !isValid}
              >
                {t('register')}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterUserForm;
