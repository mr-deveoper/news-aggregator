// Interface for an article
export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source: string;
    category?: string;
}

// Interface for filters
export interface ArticleFilters {
    date?: string;
    source?: string;
    category?: string;
}