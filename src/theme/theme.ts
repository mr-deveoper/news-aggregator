import { createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export const useTheme = () => {
  const { i18n } = useTranslation();

  return createTheme({
    direction: i18n.dir(),
    palette: {
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
    },
  });
}; 