import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('nav.settings')}
      </Typography>
      <Typography variant="body1">Settings page content will be added here.</Typography>
    </Box>
  );
};

export default SettingsPage;
