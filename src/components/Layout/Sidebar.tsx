import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Quiz as QuizIcon,
  Campaign as AnnouncementIcon,
  Settings as SettingsIcon,
  Language as LanguageIcon,
  AccountCircle,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/authSlice';

interface SidebarProps {
  onMobileClose?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onMobileClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    handleLanguageMenuClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const menuItems = [
    { text: t('nav.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('nav.quizzes'), icon: <QuizIcon />, path: '/quizzes' },
    { text: t('nav.announcements'), icon: <AnnouncementIcon />, path: '/announcements' },
    { text: t('nav.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.main',
      }}
    >
      {/* Header/Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 64,
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          {t('dashboard.title')}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      {/* User Info Section */}
      {isAuthenticated && user && (
        <>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
              <AccountCircle />
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 'medium' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        </>
      )}

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.24)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      {/* Bottom Actions */}
      <Box sx={{ p: 2 }}>
        {/* Login Button for non-authenticated users */}
        {!isAuthenticated && (
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            {t('auth.login')}
          </Button>
        )}


        {/* Language Switcher */}
        <ListItemButton
          onClick={handleLanguageMenuOpen}
          sx={{
            borderRadius: 1,
            color: 'white',
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.language === 'ar' ? 'العربية' : 'English'} />
        </ListItemButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: i18n.language === 'ar' ? 'left' : 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: i18n.language === 'ar' ? 'left' : 'right',
          }}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem>
        </Menu>

        {/* Logout Button */}
        {isAuthenticated && (
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('auth.logout')} />
          </ListItemButton>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
