import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import ArticleList from './components/Article/ArticleList';
import { fetchNewsOrgArticles } from './services/newsOrgApi';
import { fetchNewsAiArticles } from './services/newsAiApi';
import { fetchGuardianNewsArticles } from './services/gurdianNewsApi';
import { Article, ArticleFilters as FiltersType } from './interfaces/Article';
import { useTheme } from './theme/theme';
import { Layout } from './components/Layout/Layout';
import './styles/main.scss';

const App: React.FC = () => {
  const theme = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FiltersType>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize handleSearch using useCallback
  const handleSearch = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setQuery(searchQuery);
      const allArticles = [];
      
      const [newsOrgArticles, newsAiArticles, guardianArticles] = await Promise.allSettled([
        process.env.REACT_APP_NEWS_ORG_API_KEY ? fetchNewsOrgArticles(searchQuery, filters) : Promise.resolve([]),
        process.env.REACT_APP_NEWS_AI_API_KEY ? fetchNewsAiArticles(searchQuery, filters) : Promise.resolve([]),
        process.env.REACT_APP_GUARDIAN_API_KEY ? fetchGuardianNewsArticles(searchQuery, filters) : Promise.resolve([])
      ]);

      // Handle results
      if (newsOrgArticles.status === 'fulfilled') allArticles.push(...newsOrgArticles.value);
      if (newsAiArticles.status === 'fulfilled') allArticles.push(...newsAiArticles.value);
      if (guardianArticles.status === 'fulfilled') allArticles.push(...guardianArticles.value);

      if (allArticles.length === 0) {
        setError('No articles found. Try different search terms or check your internet connection.');
      }

      setArticles(allArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleFilter = async (newFilters: FiltersType) => {
    setFilters(newFilters);
    handleSearch(query); // Reuse search logic with new filters
  };

  const handleReset = useCallback(() => {
    setQuery('');
    setFilters({});
    handleSearch('news');
  }, [handleSearch]);

  useEffect(() => {
    // Fetch initial articles on page load
    handleSearch('news');
  }, [handleSearch]); // Add handleSearch to the dependency array

  return (
    <ThemeProvider theme={theme}>
      <Layout onFilter={handleFilter}>
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
        <ArticleList articles={articles} isLoading={isLoading} error={error} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;