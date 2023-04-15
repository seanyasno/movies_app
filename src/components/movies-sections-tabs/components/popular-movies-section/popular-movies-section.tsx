import React from 'react';

import { ActivityIndicator } from 'react-native-paper';

import { MovieCardCarousel } from '../../..';
import { usePopularMovies } from '../../../../hooks';

export const PopularMoviesSection: React.FC = () => {
    const { data: popularMovies, isLoading: popularMoviesLoading } =
        usePopularMovies();

    if (popularMoviesLoading) {
        return <ActivityIndicator />;
    }

    return <MovieCardCarousel movies={popularMovies} />;
};

export const MemoizedPopularMoviesSection = React.memo(
    PopularMoviesSection,
    () => true
);
