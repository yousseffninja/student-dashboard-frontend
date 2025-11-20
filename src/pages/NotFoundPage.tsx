import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SentimentDissatisfied } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <SentimentDissatisfied sx={{ fontSize: 120, color: 'text.secondary', mb: 2 }} />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          {t('common.pageNotFound')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          {t('common.pageNotFoundDesc')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
            {t('common.goToDashboard')}
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            {t('common.goBack')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
