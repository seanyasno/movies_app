import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Appbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { CustomList } from '../../components';
import { useMediaDetails, useMediaTrailers } from '../../hooks';
import { MediaType, MovieDetailsStackNavigationProp } from '../../types';
import { tmdbClient } from '../../utils';
import { ElevatingSection } from './components';

const formatMediaDetailsByMediaType = (
    details,
    mediaType: MediaType
): {
    title: string;
    releaseDate: string;
    posterPath: string;
    voteAverage: number;
    overview: string;
    genres: { id: number; name: string }[];
} => {
    switch (mediaType) {
        case MediaType.MOVIE:
            return {
                title: details.title,
                releaseDate: details.release_date,
                posterPath: details.poster_path,
                voteAverage: details.vote_average,
                overview: details.overview,
                genres: details.genres,
            };
        case MediaType.TV:
            return {
                title: details.name,
                releaseDate: details.first_air_date,
                posterPath: details.poster_path,
                voteAverage: details.vote_average,
                overview: details.overview,
                genres: details.genres,
            };
        case MediaType.PERSON:
            return {
                title: details.name,
                releaseDate: details.birthday,
                posterPath: details.profile_path,
                voteAverage: 1 / (details.popularity / 10),
                overview: details.biography,
                genres: [],
            };
        default:
            return {
                title: 'Unknown',
                releaseDate: 'Unknown',
                posterPath: '',
                voteAverage: 0,
                overview: 'Unknown',
                genres: [],
            };
    }
};

export const MovieDetailsScreen: React.FC<MovieDetailsStackNavigationProp> = (
    props
) => {
    const { mediaId, mediaType } = props.route.params ?? {
        mediaId: 0,
        mediaType: MediaType.MOVIE,
    };
    const { width } = useWindowDimensions();
    const {
        data: details,
        isLoading: loadingDetails,
        isSuccess: detailsSuccess,
    } = useMediaDetails(mediaId, mediaType);

    const { data: trailers, isLoading: loadingTrailer } = useMediaTrailers(
        mediaId,
        mediaType,
        {
            enabled: detailsSuccess,
        }
    );

    const { data: cast, isLoading: isLoadingCast } = useQuery({
        queryKey: ['movie-credits', props.route.params?.mediaId],
        queryFn: async () => {
            const url = `/${mediaType}/${mediaId}/credits`;
            const response = await tmdbClient.get(url);
            return response.data.cast;
        },
        enabled: detailsSuccess,
    });

    if (loadingDetails || loadingTrailer || isLoadingCast) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const { title, releaseDate, posterPath, voteAverage, overview, genres } =
        formatMediaDetailsByMediaType(details, mediaType);

    const imagePath = `https://image.tmdb.org/t/p/original${posterPath}`;

    const trailer = trailers?.find(({ type }) => type === 'Trailer')?.key;
    const trailerUrl = `https://www.youtube.com/watch?v=${trailer}`;

    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} />

            <ScrollView>
                <View>
                    <FastImage
                        source={{ uri: imagePath }}
                        style={{
                            width,
                            height: width * (4 / 3),
                            borderBottomLeftRadius: s(30),
                            borderBottomRightRadius: s(30),
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                    <Appbar.BackAction
                        onPress={() => props.navigation.goBack()}
                        color={'#ffffff'}
                        style={styles.back}
                    />

                    {mediaType !== MediaType.PERSON && (
                        <ElevatingSection
                            voteAverage={voteAverage}
                            trailerUrl={trailerUrl}
                        />
                    )}
                </View>

                <View
                    style={{
                        margin: s(20),
                        marginTop:
                            mediaType !== MediaType.PERSON ? s(70) : s(20),
                    }}
                >
                    <Text style={styles.movieTitle}>{title}</Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: s(10),
                            columnGap: s(2),
                        }}
                    >
                        {genres.map(({ name, id }, index) => (
                            <Text
                                key={id}
                                style={{
                                    color: '#25365047',
                                    fontSize: s(12),
                                }}
                            >
                                {name}
                                {index !== genres.length - 1 ? ', ' : ''}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.overviewTitle}>Overview</Text>
                    <Text style={styles.overviewContent}>{overview}</Text>

                    <Text style={styles.overviewTitle}>Series Cast</Text>

                    <CustomList
                        data={cast.map(
                            ({
                                name,
                                title,
                                character,
                                profile_path,
                                poster_path,
                            }) => ({
                                imageUri: `https://image.tmdb.org/t/p/original${
                                    profile_path ?? poster_path
                                }`,
                                title: name ?? title,
                                description: character,
                            })
                        )}
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
