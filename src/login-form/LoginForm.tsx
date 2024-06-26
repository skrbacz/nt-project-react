import { Button, ThemeProvider, createTheme } from '@mui/material';
import './LoginForm.css';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import ImageLoginForm from './ImageLoginForm.svg';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t('usernameReqLog')),
        password: yup
          .string()
          .required(t('passwordReqLog')),
      }),
    [],
  );

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
            color: '#fff', // White text color for the button
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="login-page">
        <div className="login-container">
          <div className="bookmark-shape"></div>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
          >
            {(formik: any) => (
              <form
                className="login-form"
                id="signInForm"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <TextField
                  id="username"
                  label= {t('username')}
                  variant="outlined"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  id="password"
                  label={t('password')}
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  type="submit"
                  form="signInForm"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                 {t('signIn')}
                </Button>
              </form>
            )}
          </Formik>
        </div>

        <div className="svg-container">
          <img src={ImageLoginForm} alt="Logo" className="svg-image" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LoginForm;
