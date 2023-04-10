import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { CustomList } from '../../components';
import { useTrendingMovies } from '../../hooks';
import { RootStackParamList } from '../../types';
import { SectionList } from './components';

export const SearchScreen: React.FC = () => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'Search'>
        >();
    const { data: trendingMovies, isLoading: loadingTrendingMovies } =
        useTrendingMovies();

    const searchLabel = 'Search for a movie, tv show, actor';

    if (loadingTrendingMovies) {
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
                <SectionList
                    data={trendingMovies.map((movie) => ({
                        id: movie.id,
                        imageUri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                        title: movie.title,
                        description: movie.release_date,
                    }))}
                    title={'Movies'}
                />
            </ScrollView>
        </>
    );
};
