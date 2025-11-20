import React from 'react';
import { Box, Button, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Dashboard as DashboardIcon,
  Quiz as QuizIcon,
  Campaign as AnnouncementIcon,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
} from '@mui/icons-material';

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('nav.dashboard'),
      description: 'View your personalized dashboard',
    },
    {
      icon: <QuizIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('nav.quizzes'),
      description: 'Access and complete quizzes',
    },
    {
      icon: <AnnouncementIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('nav.announcements'),
      description: 'Stay updated with announcements',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {t('auth.welcome')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
            }}
          >
            {t('auth.pleaseLogin')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              {t('auth.login')}
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              startIcon={<SignUpIcon />}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {t('auth.signUp')}
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              variant="text"
              size="large"
              sx={{
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {t('auth.continueAsGuest')}
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomePage;
