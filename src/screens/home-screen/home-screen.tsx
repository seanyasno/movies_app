import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { ms, s, vs } from 'react-native-size-matters';

import { MovieCardCarousel } from '../../components/movie-card-carousel/movie-card-carousel';

export const HomeScreen: React.FC = () => {
    const { colors } = useTheme();

    const title = 'Millions of movies, TV shows and people to discover.';
    const tmdbApiKey = '705f9bb5b072c6425cdc30e2638d3975';
    const tmdbBaseUrl = 'https://api.themoviedb.org/3';

    const { data, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const response = await axios.get(
                `${tmdbBaseUrl}/trending/movie/day`,
                {
                    params: {
                        api_key: tmdbApiKey,
                    },
                }
            );
            return response.data.results;
        },
    });

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon={'menu'} onPress={() => {}} />
                <Appbar.Content title={''} />
                <Appbar.Action icon={'magnify'} onPress={() => {}} />
            </Appbar.Header>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: colors.background,
                }}
            >
                <Text
                    style={{
                        fontSize: s(26),
                        marginBottom: s(20),
                        paddingHorizontal: s(10),
                    }}
                >
                    {title}
                </Text>
                <MovieCardCarousel movies={data} />
            </View>
        </>
    );
};
