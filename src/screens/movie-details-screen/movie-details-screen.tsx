import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { CustomList } from '../../components';
import { useMovieDetails, useMovieTrailers } from '../../hooks';
import { MovieDetailsStackNavigationProp } from '../../types';
import { tmdbClient } from '../../utils';
import { ElevatingSection } from './components';

export const MovieDetailsScreen: React.FC<MovieDetailsStackNavigationProp> = (
    props
) => {
    const { width } = useWindowDimensions();
    const {
        data: movieDetails,
        isLoading,
        isSuccess,
    } = useMovieDetails(props.route.params?.movieId);

    const { data: trailers, isLoading: loadingTrailer } = useMovieTrailers(
        props.route.params?.movieId,
        {
            enabled: isSuccess,
        }
    );

    const { data: cast, isLoading: isLoadingCast } = useQuery({
        queryKey: ['movie-credits', props.route.params?.movieId],
        queryFn: async () => {
            const url = `/movie/${props.route.params?.movieId}/credits`;
            const response = await tmdbClient.get(url);
            return response.data.cast;
        },
        enabled: isSuccess,
    });

    if (isLoading || loadingTrailer || isLoadingCast) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const imagePath = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;

    const trailer = trailers?.find(({ type }) => type === 'Trailer')?.key;
    const trailerUrl = `https://www.youtube.com/watch?v=${trailer}`;

    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} />

            <ScrollView>
                <View>
                    <Image
                        source={{
                            uri: imagePath,
                            width: width,
                            height: width * (4 / 3),
                        }}
                        resizeMode={'cover'}
                        style={{
                            borderBottomLeftRadius: s(30),
                            borderBottomRightRadius: s(30),
                        }}
                    />
                    <Appbar.BackAction
                        onPress={() => props.navigation.goBack()}
                        color={'#ffffff'}
                        style={styles.back}
                    />

                    <ElevatingSection
                        voteAverage={movieDetails.vote_average}
                        trailerUrl={trailerUrl}
                    />
                </View>

                <View
                    style={{
                        margin: s(20),
                        marginTop: s(70),
                    }}
                >
                    <Text style={styles.movieTitle}>{movieDetails.title}</Text>

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

                    <Text style={styles.overviewTitle}>Overview</Text>
                    <Text style={styles.overviewContent}>
                        {movieDetails.overview}
                    </Text>

                    <Text style={styles.overviewTitle}>Series Cast</Text>

                    <CustomList
                        data={cast.map(({ name, character, profile_path }) => ({
                            imageUri: `https://image.tmdb.org/t/p/original${profile_path}`,
                            title: name,
                            description: character,
                        }))}
                        scrollProps={{ horizontal: true }}
                        containerStyle={{
                            alignItems: 'center',
                            marginRight: s(10),
                            rowGap: s(5),
                        }}
                        imageProps={{
                            width: s(70),
                            height: s(70),
                        }}
                        imageStyle={{
                            borderRadius: s(50),
                        }}
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: s(44),
        backgroundColor: '#ffffff15',
        borderRadius: s(10),
        marginLeft: s(10),
    },
    movieTitle: { color: '#253650', fontSize: s(18), fontWeight: 'bold' },
    overviewTitle: {
        color: '#253650',
        fontSize: s(14),
        fontWeight: 'bold',
        marginTop: s(24),
        marginBottom: s(14),
    },
    overviewContent: {
        fontSize: s(12),
        lineHeight: s(24),
    },
});
