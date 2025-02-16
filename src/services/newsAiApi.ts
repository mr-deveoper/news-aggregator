import apiClient from './apiClient';
import { Article, ArticleFilters } from '../interfaces/Article';
import { transformArticle } from '../utils/transformArticle';
import { NEWS_AI_API_KEY } from '../config/apiKeys';

// Fetch articles from OpenNews
export const fetchNewsAiArticles = async (query: string, filters: ArticleFilters) => {
  try {
    const response = await apiClient.get('https://eventregistry.org/api/v1/article/getArticles', {
      params: {
        keyword: query,
        dateStart: filters.date,
        sourceUri: filters.source,
        categoryUri: filters.category,
        apiKey: NEWS_AI_API_KEY,
      },
    });
    return response.data.articles.results.map((article: any) => transformArticle(article, 'newsAi')) as Article[];
  } catch (error) {
    console.error('Error fetching OpenNews articles:', error);
    return [];
  }
};