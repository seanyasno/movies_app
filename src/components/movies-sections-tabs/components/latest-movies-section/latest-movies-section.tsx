import React from 'react';

import { ActivityIndicator } from 'react-native-paper';

import { MovieCardCarousel } from '../../..';
import { useLatestMovies } from '../../../../hooks';

export const LatestMoviesSection: React.FC = () => {
    const { data: latestMovies, isLoading: latestMoviesLoading } =
        useLatestMovies();

    if (latestMoviesLoading) {
        return <ActivityIndicator />;
    }

    return <MovieCardCarousel movies={latestMovies} />;
};

export const MemoizedLatestMoviesSection = React.memo(
    LatestMoviesSection,
    () => true
);
