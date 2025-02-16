// src/utils/transformArticle.ts
import { Article } from '../interfaces/Article';

// Transform NewsAPI response
const transformNewsOrgArticle = (article: any): Article => ({
  title: article.title,
  description: article.description,
  url: article.url,
  urlToImage: article.urlToImage,
  publishedAt: article.publishedAt,
  source: article.source.name
});

// Transform OpenNews response
const transformNewsAiArticle = (article: any): Article => ({
  title: article.title,
  description: article.body,
  url: article.url,
  urlToImage: article.image,
  publishedAt: article.date,
  source: article.source.title
});

// Transform NewsCred response
const transformGuardianArticle = (article: any): Article => ({
  title: article.webTitle,
  description: '',
  url: article.webUrl,
  urlToImage: '',
  publishedAt: article.webPublicationDate,
  source: article.sectionName
});

// Export a unified transformation function
export const transformArticle = (article: any, source: 'newsOrg' | 'newsAi' | 'guardianNews'): Article => {
  switch (source) {
    case 'newsOrg':
      return transformNewsOrgArticle(article);
    case 'newsAi':
      return transformNewsAiArticle(article);
    case 'guardianNews':
      return transformGuardianArticle(article);
    default:
      throw new Error(`Unsupported data source: ${source}`);
  }
};