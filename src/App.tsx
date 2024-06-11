import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import LoginForm from './login-form/LoginForm';
import HomeForm from './home/HomeForm';
import ApiProvider from './api/ApiProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { NavigateProvider } from './api/NavigateToLogin';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <NavigateProvider>
          <ApiProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<HomeForm />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
              </Routes>
            </div>
          </ApiProvider>
        </NavigateProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
