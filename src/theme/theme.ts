import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Direction } from 'types';

export const getTheme = (direction: Direction) => {
  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: direction === 'rtl' 
        ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#1976d2',
            color: '#ffffff',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#1976d2',
              '& .MuiListItemIcon-root': {
                color: '#1976d2',
              },
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};