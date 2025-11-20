import React from 'react';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'fixed',
          top: 16,
          [i18n.language === 'ar' ? 'left' : 'right']: 16,
          zIndex: 9999,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: i18n.language === 'ar' ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: i18n.language === 'ar' ? 'left' : 'right',
        }}
      >
        <MenuItem
          onClick={() => changeLanguage('en')}
          selected={i18n.language === 'en'}
        >
          <Box>
            <Typography variant="body1">English</Typography>
            <Typography variant="caption" color="text.secondary">
              EN
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('ar')}
          selected={i18n.language === 'ar'}
        >
          <Box>
            <Typography variant="body1">العربية</Typography>
            <Typography variant="caption" color="text.secondary">
              AR
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
