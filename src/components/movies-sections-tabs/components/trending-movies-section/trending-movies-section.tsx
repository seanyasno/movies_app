import React from 'react';

import { ActivityIndicator } from 'react-native-paper';

import { MovieCardCarousel } from '../../..';
import { useTrendingMediaByType } from '../../../../hooks';

export const TrendingMoviesSection: React.FC = () => {
    const { data: trendingMovies, isLoading: trendingMoviesLoading } =
        useTrendingMediaByType();

    if (trendingMoviesLoading) {
        return <ActivityIndicator />;
    }

    return <MovieCardCarousel movies={trendingMovies} />;
};

export const MemoizedTrendingMoviesSection = React.memo(
    TrendingMoviesSection,
    () => true
);
