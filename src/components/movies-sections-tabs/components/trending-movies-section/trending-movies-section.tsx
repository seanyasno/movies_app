import React from 'react';

import { Text } from 'react-native-paper';

import { MovieCardCarousel } from '../../..';
import { useTrendingMediaByType } from '../../../../hooks';

export const TrendingMoviesSection: React.FC = () => {
    const { data: trendingMovies, isLoading: trendingMoviesLoading } =
        useTrendingMediaByType();

    if (trendingMoviesLoading) {
        return <Text>Loading...</Text>;
    }

    return <MovieCardCarousel movies={trendingMovies} />;
};

export const MemoizedTrendingMoviesSection = React.memo(
    TrendingMoviesSection,
    () => true
);
