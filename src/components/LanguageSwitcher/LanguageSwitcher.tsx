import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label={t('app.language')}
        aria-controls="language-menu"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={handleMenu}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        aria-label={t('accessibility.languageSelector')}
      >
        <MenuItem 
          onClick={() => changeLanguage('en')}
          aria-label="English"
        >
          English
        </MenuItem>
        <MenuItem 
          onClick={() => changeLanguage('de')}
          aria-label="Deutsch"
        >
          Deutsch
        </MenuItem>
      </Menu>
    </>
  );
}; 