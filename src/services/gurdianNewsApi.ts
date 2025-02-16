import apiClient from './apiClient';
import { Article, ArticleFilters } from '../interfaces/Article';
import { transformArticle } from '../utils/transformArticle';
import { GUARDIAN_API_KEY } from '../config/apiKeys';

// Fetch articles from Guardian
export const fetchGuardianNewsArticles = async (query: string, filters: ArticleFilters) => {
  try {
    const response = await apiClient.get('https://content.guardianapis.com/search', {
      params: {
        q: query,
        'from-date': filters.date,
        source: filters.source,
        tag: filters.category,
        'api-key': GUARDIAN_API_KEY,
      },
    });
    return response.data.response.results.map((article: any) => transformArticle(article, 'guardianNews')) as Article[];
  } catch (error) {
    console.error('Error fetching Guardian articles:', error);
    return [];
  }
};