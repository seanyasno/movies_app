import React from 'react';

import { Text } from 'react-native-paper';

import { MovieCardCarousel } from '../../..';
import { useLatestMovies } from '../../../../hooks';

export const LatestMoviesSection: React.FC = () => {
    const { data: latestMovies, isLoading: latestMoviesLoading } =
        useLatestMovies();

    if (latestMoviesLoading) {
        return <Text>Loading...</Text>;
    }

    return <MovieCardCarousel movies={latestMovies} />;
};

export const MemoizedLatestMoviesSection = React.memo(
    LatestMoviesSection,
    () => true
);
