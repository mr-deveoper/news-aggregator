import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { ArticleFilters } from '../../interfaces/Article';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';

interface FiltersProps {
  onFilter: (filters: ArticleFilters) => void;
  onClose?: () => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter, onClose }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [source, setSource] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleFilter = () => {
    const filters: ArticleFilters = {};
    
    if (date) filters.date = date.format('YYYY-MM-DD');
    if (source) filters.source = source;
    if (category) filters.category = category;
    
    const hasFilters = Object.keys(filters).length > 0;
    if (!hasFilters) {
      return;
    }
    onFilter(filters);
    if (onClose) onClose();
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      gap={3}
      sx={{
        width: '100%',
        '& > *': { width: '100%' }
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={t('filters.date.label')}
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ 
            textField: { 
              variant: 'outlined',
              fullWidth: true,
              placeholder: t('filters.date.placeholder'),
              sx: { 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }
            } 
          }}
        />
      </LocalizationProvider>
      
      <TextField
        label={t('filters.source.label')}
        variant="outlined"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder={t('filters.source.placeholder')}
        fullWidth
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }}
      />
      
      <FormControl 
        variant="outlined" 
        fullWidth
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }}
      >
        <InputLabel>{t('filters.category.label')}</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          label={t('filters.category.label')}
        >
          <MenuItem value="">{t('filters.category.all')}</MenuItem>
          <MenuItem value="technology">{t('filters.category.technology')}</MenuItem>
          <MenuItem value="business">{t('filters.category.business')}</MenuItem>
          <MenuItem value="sports">{t('filters.category.sports')}</MenuItem>
          <MenuItem value="health">{t('filters.category.health')}</MenuItem>
        </Select>
      </FormControl>
      
      <Button 
        variant="contained" 
        onClick={handleFilter}
        disabled={!date && !source && !category}
        fullWidth
        startIcon={<FilterListIcon />}
        sx={{ 
          height: '48px',
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '1rem'
        }}
      >
        {t('filters.apply')}
      </Button>
    </Box>
  );
};

export default Filters;