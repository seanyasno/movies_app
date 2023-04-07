import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
    Image,
    SafeAreaView,
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { MovieDetailsStackNavigationProp } from '../../types';
import { tmdbClient } from '../../utils';

export const MovieDetailsScreen: React.FC<MovieDetailsStackNavigationProp> = (
    props
) => {
    const { width } = useWindowDimensions();
    const { data: movieDetails, isLoading } = useQuery({
        queryKey: ['movie', props.route.params?.movieId],
        queryFn: async () => {
            const response = await tmdbClient.get(
                `/movie/${props.route.params?.movieId}`
            );
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const imagePath = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <ScrollView>
                <Image
                    source={{
                        uri: imagePath,
                        height: 450,
                        width: width,
                    }}
                    resizeMode={'cover'}
                />

                <View
                    style={{
                        margin: s(20),
                    }}
                >
                    <Text
                        style={{
                            color: '#253650',
                            fontSize: s(16),
                            fontWeight: 'bold',
                        }}
                    >
                        {movieDetails.title}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: s(10),
                            columnGap: s(2),
                        }}
                    >
                        {movieDetails.genres.map(({ name, id }, index) => (
                            <Text
                                key={id}
                                style={{
                                    color: '#25365047',
                                    fontSize: s(12),
                                }}
                            >
                                {name}
                                {index !== movieDetails.genres.length - 1
                                    ? ', '
                                    : ''}
                            </Text>
                        ))}
                    </View>

                    <Text
                        style={{
                            color: '#253650',
                            fontSize: s(14),
                            fontWeight: 'bold',
                            marginTop: s(24),
                            marginBottom: s(14),
                        }}
                    >
                        Overview
                    </Text>
                    <Text
                        style={{
                            fontSize: s(12),
                            lineHeight: s(24),
                        }}
                    >
                        {movieDetails.overview}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
