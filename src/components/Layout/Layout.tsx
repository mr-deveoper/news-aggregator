import React, { useState, useEffect, useCallback } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, Fab } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import { SCROLL_THRESHOLD } from '../../constants';
import Filters from '../Filters/Filters';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface LayoutProps {
    children: React.ReactNode;
    onFilter: (filters: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onFilter }) => {
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleScroll = useCallback(() => {
        setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box 
            className="layout__container"
            role="main"
            aria-label={t('accessibility.mainContent')}
        >
            <AppBar 
                position="fixed" 
                elevation={0} 
                className="layout__appbar"
                role="navigation"
                aria-label={t('accessibility.navigation')}
            >
                <Toolbar>
                    <NavigationButtons 
                        onOpenFilters={() => setIsSidebarOpen(true)} 
                    />
                    <Typography 
                        variant="h6"
                        className="layout__title"
                        aria-label={t('app.title')}
                    >
                        {t('app.title')}
                    </Typography>
                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>

            <Box 
                className="layout__main" 
                role="main"
                aria-label={t('accessibility.mainContent')}
            >
                {children}
            </Box>

            <BackToTopButton 
                show={showBackToTop} 
                onClick={handleBackToTop} 
            />

            <FiltersDrawer 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onFilter={onFilter}
            />
        </Box>
    );
};

// Separate components for better organization
const NavigationButtons = ({ onOpenFilters }: { onOpenFilters: () => void }) => {
    const { t } = useTranslation();
    
    return (
        <Box 
            className="layout__filter-button"
            onClick={onOpenFilters}
            role="button"
            tabIndex={0}
            aria-label={t('accessibility.openFilters')}
            onKeyPress={(e) => e.key === 'Enter' && onOpenFilters()}
        >
            <IconButton 
                className="layout__filter-icon"
                aria-label={t('accessibility.openFilters')}
            >
                <FilterAltIcon />
            </IconButton>
            <Typography className="layout__filter-text">
                {t('app.filters')}
            </Typography>
        </Box>
    );
};

const BackToTopButton = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
    const { t } = useTranslation();
    
    return (
        <Fab 
            className={`layout__back-to-top ${show ? 'visible' : ''}`}
            onClick={onClick}
            aria-label={t('accessibility.backToTop')}
        >
            <KeyboardArrowUpIcon />
        </Fab>
    );
};

const FiltersDrawer = ({ 
    isOpen, 
    onClose, 
    onFilter 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onFilter: (filters: any) => void;
}) => {
    const { t } = useTranslation();
    
    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={onClose}
            classes={{ paper: 'layout__drawer' }}
            ModalProps={{
                keepMounted: true,
                'aria-label': t('filters.title')
            }}
            role="complementary"
            aria-label={t('filters.title')}
        >
            <Filters onFilter={onFilter} onClose={onClose} />
        </Drawer>
    );
};

export default React.memo(Layout); 