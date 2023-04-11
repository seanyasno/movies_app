import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Searchbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { useTrendingMediaByType } from '../../hooks';
import { MediaType, RootStackParamList } from '../../types';
import { tmdbClient } from '../../utils';
import { MemoizedSectionList } from './components';

export const SearchScreen: React.FC = () => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'Search'>
        >();
    const [query, setQuery] = useState('');
    const { data: trendingMovies, isLoading: loadingTrendingMovies } =
        useTrendingMediaByType();
    const { data: trendingTVShows, isLoading: loadingTrendingTVShows } =
        useTrendingMediaByType(MediaType.TV);
    const { data: trendingPeople, isLoading: loadingTrendingPeople } =
        useTrendingMediaByType(MediaType.PERSON);

    const { data: searchedData, isLoading: loadingSearchedData } = useQuery({
        queryKey: ['search', query],
        queryFn: async ({ queryKey }) => {
            const url = '/search/multi';
            const response = await tmdbClient.get(url, {
                params: {
                    query: queryKey[1],
                },
            });
            return response.data.results;
        },
    });

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

    const filterSearchDataByType = (type: MediaType) => {
        return searchedData?.filter((item) => item.media_type === type);
    };

    const filteredSearchedMovies = filterSearchDataByType(MediaType.MOVIE);
    const filteredSearchedTVShows = filterSearchDataByType(MediaType.TV);
    const filteredSearchedPeople = filterSearchDataByType(MediaType.PERSON);

    const mediaWithDefault = (media: [], defaultMedia: []) =>
        isEmpty(media) && isEmpty(query) ? defaultMedia : media;

    const mappedTrendingMovies = mediaWithDefault(
        filteredSearchedMovies,
        trendingMovies
    )?.map(({ id, poster_path, title, release_date }) => ({
        id,
        imageUri: `https://image.tmdb.org/t/p/original${poster_path}`,
        title,
        description: isEmpty(release_date)
            ? undefined
            : dateFormat.format(new Date(release_date)),
    }));

    const mappedTrendingTVShows = mediaWithDefault(
        filteredSearchedTVShows,
        trendingTVShows
    )?.map(({ id, poster_path, name, first_air_date }) => ({
        id,
        imageUri: `https://image.tmdb.org/t/p/original${poster_path}`,
        title: name,
        description: isEmpty(first_air_date)
            ? undefined
            : dateFormat.format(new Date(first_air_date)),
    }));

    const mappedTrendingPeople = mediaWithDefault(
        filteredSearchedPeople,
        trendingPeople
    )
        ?.filter(({ profile_path }) => profile_path)
        .map(({ id, profile_path, name }) => ({
            id,
            imageUri: `https://image.tmdb.org/t/p/original${profile_path}`,
            title: name,
        }));

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

                <Searchbar
                    placeholder={'Search'}
                    value={query}
                    onChangeText={(newQuery) => setQuery(newQuery)}
                    style={{
                        borderRadius: s(10),
                        backgroundColor: '#EFEFEF',
                        marginVertical: s(20),
                    }}
                />

                {loadingSearchedData ? (
                    <ActivityIndicator
                        style={{
                            marginTop: s(20),
                        }}
                    />
                ) : (
                    <View
                        style={{
                            rowGap: s(20),
                        }}
                    >
                        {mappedTrendingMovies?.length > 0 && (
                            <MemoizedSectionList
                                data={mappedTrendingMovies as []}
                                title={'Movies'}
                                mediaType={MediaType.MOVIE}
                            />
                        )}

                        {mappedTrendingTVShows?.length > 0 && (
                            <MemoizedSectionList
                                data={mappedTrendingTVShows as []}
                                title={'TV Shows'}
                                mediaType={MediaType.TV}
                            />
                        )}

                        {mappedTrendingPeople?.length > 0 && (
                            <MemoizedSectionList
                                data={mappedTrendingPeople as []}
                                title={'Actors'}
                                mediaType={MediaType.PERSON}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
        </>
    );
};
