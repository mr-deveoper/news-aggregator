import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Article } from '../../interfaces/Article';
import { DEFAULT_IMAGE } from '../../constants';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { t } = useTranslation();
    const imageUrl = article.urlToImage || DEFAULT_IMAGE;

    const handleCardClick = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLButtonElement) return;
        window.open(article.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Card 
            className="article-card" 
            onClick={handleCardClick}
            role="article"
            tabIndex={0}
            aria-label={article.title}
        >
            <CardMedia
                className="article-card__media"
                component="img"
                image={imageUrl}
                alt={t('article.imageAlt')}
                loading="lazy"
                height="180"
            />
            <CardContent className="article-card__content">
                <ArticleHeader title={article.title} />
                <ArticleDescription description={article.description} />
                <ArticleTags source={article.source} category={article.category} />
                <ArticleDate publishedAt={article.publishedAt} />
                <ArticleButton url={article.url} title={article.title} />
            </CardContent>
        </Card>
    );
};

// Separate components for better organization and reusability
const ArticleHeader = ({ title }: { title: string }) => (
    <Typography 
        className="article-card__title"
        component="h2"
        aria-label={title}
    >
        {title}
    </Typography>
);

const ArticleDescription = ({ description }: { description: string }) => (
    <Typography 
        className="article-card__description"
        component="p"
    >
        {description}
    </Typography>
);

const ArticleTags = ({ source, category }: { source?: string; category?: string }) => {
    const { t } = useTranslation();
    
    return (
        <Box 
            className="article-card__chips"
            role="list"
            aria-label={t('article.categories')}
        >
            {source && (
                <Chip 
                    className="article-card__chip"
                    label={source} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    role="listitem"
                    aria-label={`${t('article.source')}: ${source}`}
                />
            )}
            {category && (
                <Chip 
                    className="article-card__chip"
                    label={category} 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                    role="listitem"
                    aria-label={`${t('article.category')}: ${category}`}
                />
            )}
        </Box>
    );
};

const ArticleDate = ({ publishedAt }: { publishedAt: string }) => {
    const { t, i18n } = useTranslation();
    
    return (
        <Typography 
            className="article-card__date"
            component="time"
            dateTime={publishedAt}
        >
            {t('article.publishedAt')} {new Date(publishedAt).toLocaleDateString(i18n.language)}
        </Typography>
    );
};

const ArticleButton = ({ url, title }: { url: string; title: string }) => {
    const { t } = useTranslation();
    
    return (
        <Button 
            className="article-card__button"
            variant="contained"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${t('article.readMore')}: ${title}`}
        >
            {t('article.readMore')}
        </Button>
    );
};

export default React.memo(ArticleCard);