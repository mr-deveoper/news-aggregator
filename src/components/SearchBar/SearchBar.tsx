import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('news');
  };

  const handleReset = () => {
    setQuery('');
    onReset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      onSearch('news');
    }
  };

  return (
    <Box className="search-bar__container">
      <Paper className="search-bar__paper" elevation={3}>
        <IconButton 
          className="search-bar__search-button"
          onClick={handleSearch}
          aria-label={t('search.searchButton')}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className="search-bar__input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          aria-label={t('search.placeholder')}
        />
        {query && (
          <IconButton 
            className="search-bar__action-button" 
            onClick={handleClear}
            aria-label={t('search.clearSearch')}
          >
            <ClearIcon />
          </IconButton>
        )}
        <IconButton 
          className="search-bar__action-button"
          onClick={handleReset}
          aria-label={t('search.resetSearch')}
        >
          <RefreshIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export { SearchBar }; 