import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store/hooks';
import { setCredentials } from 'store/slices/authSlice';
import api from 'services/api';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  // Get the page user was trying to access before being redirected to login
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      const { user, accessToken, refreshToken } = response.data;

      dispatch(setCredentials({ user, accessToken, refreshToken }));
      if (accessToken) {
        // Redirect to the page they were trying to access, or dashboard
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      // Stay on login page - don't navigate anywhere on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('auth.login')}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              {t('auth.pleaseLogin')}
            </Typography>

            {location.state?.from && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {t('auth.loginRequired')}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t('auth.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
              />
              <TextField
                fullWidth
                label={t('auth.password')}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : t('auth.login')}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <MuiLink component={Link} to="/register" variant="body2">
                  {t('auth.noAccount')} {t('auth.signUp')}
                </MuiLink>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <MuiLink component={Link} to="/forgot-password" variant="body2">
                  {t('auth.forgotPassword')}
                </MuiLink>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button component={Link} to="/dashboard" variant="text">
                  {t('auth.continueAsGuest')}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
