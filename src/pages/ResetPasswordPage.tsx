import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
  Check,
} from '@mui/icons-material';
import api from 'services/api';

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!resetToken) {
      setError(t('auth.invalidResetLink'));
    }
  }, [resetToken, t]);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      navigate('/login');
    }
  }, [success, countdown, navigate]);

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 25, label: t('auth.weak') };
    if (password.length < 10) return { strength: 50, label: t('auth.medium') };
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 100, label: t('auth.strong') };
    }
    return { strength: 75, label: t('auth.good') };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0;

  const requirements = [
    { met: formData.newPassword.length >= 6, text: t('auth.minChars') },
    { met: /[A-Z]/.test(formData.newPassword), text: t('auth.uppercase') },
    { met: /[0-9]/.test(formData.newPassword), text: t('auth.number') },
    { met: passwordsMatch, text: t('auth.passwordsMatch') },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }

    if (formData.newPassword.length < 6) {
      setError(t('auth.passwordTooShort'));
      return;
    }

    if (!resetToken) {
      setError(t('auth.invalidResetLink'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.put('/auth/reset-password', {
        newPassword: formData.newPassword,
        resetToken: resetToken,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
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
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Cancel sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {t('auth.invalidResetLink')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t('auth.requestNewReset')}
              </Typography>
              <Button variant="contained" onClick={() => navigate('/forgot-password')}>
                {t('auth.requestPasswordReset')}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  if (success) {
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
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {t('auth.passwordResetSuccess')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t('auth.redirectingToLogin', { seconds: countdown })}
              </Typography>
              <Button variant="contained" onClick={() => navigate('/login')}>
                {t('auth.goToLogin')}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('auth.resetPassword')}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              {t('auth.enterNewPassword')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t('auth.newPassword')}
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {formData.newPassword && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {t('auth.passwordStrength')}:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {passwordStrength.label}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength.strength}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.300',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          passwordStrength.strength < 50
                            ? 'error.main'
                            : passwordStrength.strength < 75
                            ? 'warning.main'
                            : 'success.main',
                      },
                    }}
                  />
                </Box>
              )}

              <TextField
                fullWidth
                label={t('auth.confirmPassword')}
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />

              {formData.newPassword && (
                <List dense sx={{ mt: 2 }}>
                  {requirements.map((req, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {req.met ? (
                          <Check sx={{ fontSize: 20, color: 'success.main' }} />
                        ) : (
                          <Cancel sx={{ fontSize: 20, color: 'error.main' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={req.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: req.met ? 'success.main' : 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !requirements.every(r => r.met)}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : t('auth.resetPasswordButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
