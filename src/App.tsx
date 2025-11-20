import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getTheme } from './theme/theme';
import DashboardLayout from './components/Layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import QuizzesPage from './pages/QuizzesPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import RequireAuth from './components/RequireAuth';
import './i18n/config';

function AppContent() {
  const { i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const theme = getTheme(direction);

  useEffect(() => {
    // Set document direction based on language
    document.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageSwitcher />
      <Router>
        <Routes>
          {/* Welcome/Landing Page */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Dashboard Routes - With Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route 
              path="quizzes" 
              element={
                <RequireAuth>
                  <QuizzesPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="announcements" 
              element={
                <RequireAuth>
                  <AnnouncementsPage />
                </RequireAuth>
              } 
            />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
