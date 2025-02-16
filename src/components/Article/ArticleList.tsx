import React from 'react';
import { ArticleCard } from './ArticleCard';
import { Article } from '../../interfaces/Article';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string | null;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, isLoading, error }) => {
  if (isLoading) {
    return (
      <Box className="article-list__loading">
        <CircularProgress size={40} />
        <Typography color="text.secondary">
          Loading articles...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="article-list__error">
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <Box className="article-list__empty">
        <Typography color="text.secondary">
          No articles found. Try different search terms or filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="article-list__container">
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {articles.map((article, index) => (
          <Grid 
            item 
            key={index} 
            xs={12} 
            sm={6} 
            md={4}
            className="article-list__grid-item"
          >
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArticleList;