import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) {
      return;
    }
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSearch();
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      mb={4}
      sx={{
        maxWidth: '600px',
        margin: '0 auto 32px',
        padding: '0 16px'
      }}
    >
      <TextField
        label="Search for articles"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type and press enter to search..."
        sx={{ 
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px 0 0 8px',
          }
        }}
      />
      <Button 
        variant="contained"
        onClick={handleSearch} 
        disabled={!query.trim()}
        sx={{ 
          height: '56px',
          borderRadius: '0 8px 8px 0',
          minWidth: '120px'
        }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;