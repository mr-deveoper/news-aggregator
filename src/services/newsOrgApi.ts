import apiClient from './apiClient';
import { Article, ArticleFilters } from '../interfaces/Article';
import { transformArticle } from '../utils/transformArticle';
import { NEWS_ORG_API_KEY } from '../config/apiKeys';

// Fetch articles from NewsAPI
export const fetchNewsOrgArticles = async (query: string, filters: ArticleFilters) => {
  try {
    const response = await apiClient.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        from: filters.date,
        sources: filters.source,
        apiKey: NEWS_ORG_API_KEY,
      },
    });
    return response.data.articles.map((article: any) => transformArticle(article, 'newsOrg')) as Article[];
  } catch (error) {
    console.error('Error fetching NewsAPI articles:', error);
    return [];
  }
};