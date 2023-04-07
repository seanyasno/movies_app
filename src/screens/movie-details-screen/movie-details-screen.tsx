import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Appbar, Button, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import { MovieDetailsStackNavigationProp } from '../../types';
import { tmdbClient } from '../../utils';

export const MovieDetailsScreen: React.FC<MovieDetailsStackNavigationProp> = (
    props
) => {
    const { width } = useWindowDimensions();
    const {
        data: movieDetails,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['movie', props.route.params?.movieId],
        queryFn: async () => {
            const response = await tmdbClient.get(
                `/movie/${props.route.params?.movieId}`
            );
            return response.data;
        },
    });

    const { data: trailers, isLoading: loadingTrailer } = useQuery({
        queryKey: ['movie-trailer', props.route.params?.movieId],
        queryFn: async () => {
            const response = await tmdbClient.get(
                `/movie/${props.route.params?.movieId}/videos`
            );
            return response.data.results;
        },
        enabled: isSuccess,
    });

    if (isLoading || loadingTrailer) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const imagePath = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;

    const trailer = trailers?.find(
        (trailer) => trailer.type === 'Trailer'
    )?.key;
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
                            borderBottomLeftRadius: s(20),
                            borderBottomRightRadius: s(20),
                        }}
                    />
                    <Appbar.BackAction
                        onPress={() => props.navigation.goBack()}
                        color={'#ffffff'}
                        style={{
                            position: 'absolute',
                            top: s(30),
                            backgroundColor: '#ffffff15',
                            borderRadius: s(10),
                            marginLeft: s(10),
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            top: width * (4 / 3) - s(45),
                            right: 0,
                            height: s(90),
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: s(25),
                            borderTopLeftRadius: s(200),
                            borderBottomLeftRadius: s(200),
                            columnGap: s(14),
                            shadowColor: '#00000040',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            elevation: 5,
                        }}
                    >
                        <CircularProgress
                            value={movieDetails.vote_average * 10}
                            maxValue={100}
                            activeStrokeColor={'#1BB3E0'}
                            activeStrokeSecondaryColor={'#16D1AE'}
                            inActiveStrokeColor={'#ECECEC'}
                            progressValueColor={'#253650'}
                            valueSuffix={'%'}
                            valueSuffixStyle={{
                                fontSize: s(8),
                                alignSelf: 'flex-start',
                                paddingTop: s(2),
                            }}
                            progressValueFontSize={s(16)}
                            radius={s(22)}
                            activeStrokeWidth={s(3)}
                            inActiveStrokeWidth={s(3)}
                        />
                        <Text
                            style={{
                                color: '#25365061',
                                width: s(36),
                                textAlign: 'center',
                                fontSize: s(12),
                            }}
                        >
                            User Score
                        </Text>

                        <TouchableOpacity
                            onPress={() => Linking.openURL(trailerUrl)}
                        >
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon name={'play-outline'} size={s(20)} />
                                <Button
                                    color={'#253650'}
                                    textColor={'#253650'}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    Play Trailer
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        margin: s(20),
                        marginTop: s(70),
                    }}
                >
                    <Text
                        style={{
                            color: '#253650',
                            fontSize: s(18),
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
        </>
    );
};
