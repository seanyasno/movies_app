import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { useTrendingMediaByType } from '../../hooks';
import { MediaType, RootStackParamList } from '../../types';
import { SectionList } from './components';

export const SearchScreen: React.FC = () => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'Search'>
        >();
    const { data: trendingMovies, isLoading: loadingTrendingMovies } =
        useTrendingMediaByType();
    const { data: trendingTVShows, isLoading: loadingTrendingTVShows } =
        useTrendingMediaByType(MediaType.TV);
    const { data: trendingPeople, isLoading: loadingTrendingPeople } =
        useTrendingMediaByType(MediaType.PERSON);

    const searchLabel = 'Search for a movie, tv show, actor';

    const dateFormat = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    if (
        loadingTrendingMovies ||
        loadingTrendingTVShows ||
        loadingTrendingPeople
    ) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: '#fff',
                }}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>

            <ScrollView
                style={{
                    paddingHorizontal: s(20),
                    backgroundColor: '#fff',
                }}
            >
                <Text
                    style={{
                        color: '#253650',
                        fontSize: s(24),
                        fontWeight: 'bold',
                    }}
                >
                    {searchLabel}
                </Text>

                <View
                    style={{
                        rowGap: s(20),
                    }}
                >
                    <SectionList
                        data={trendingMovies.map((movie) => ({
                            id: movie.id,
                            imageUri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                            title: movie.title,
                            description: dateFormat.format(
                                new Date(movie.release_date)
                            ),
                        }))}
                        title={'Movies'}
                    />

                    <SectionList
                        data={trendingTVShows.map(
                            ({ id, poster_path, name, first_air_date }) => ({
                                id,
                                imageUri: `https://image.tmdb.org/t/p/original${poster_path}`,
                                title: name,
                                description: dateFormat.format(
                                    new Date(first_air_date)
                                ),
                            })
                        )}
                        title={'TV Shows'}
                    />

                    <SectionList
                        data={trendingPeople.map(
                            ({ id, profile_path, name }) => ({
                                id,
                                imageUri: `https://image.tmdb.org/t/p/original${profile_path}`,
                                title: name,
                            })
                        )}
                        title={'Actors'}
                    />
                </View>
            </ScrollView>
        </>
    );
};
