import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { CustomList } from '../../components';
import { useTrendingMovies } from '../../hooks';
import { RootStackParamList } from '../../types';

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
                <Text
                    style={{
                        color: '#253650',
                        fontSize: s(24),
                        fontWeight: 'bold',
                    }}
                >
                    {searchLabel}
                </Text>

                <View>
                    <View>
                        <Text
                            style={{
                                color: '#253650',
                                fontSize: s(16),
                                fontWeight: 'bold',
                            }}
                        >
                            Movies
                        </Text>
                    </View>

                    <CustomList
                        data={trendingMovies.map((movie) => ({
                            id: movie.id,
                            imageUri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                            title: movie.title,
                            description: movie.release_date,
                        }))}
                        scrollProps={{
                            horizontal: true,
                        }}
                        imageProps={{
                            width: s(120),
                            height: s(154),
                        }}
                        imageStyle={{
                            borderRadius: s(18),
                            marginBottom: s(5),
                        }}
                        containerStyle={{
                            alignItems: 'center',
                            marginRight: s(10),
                            marginTop: s(10),
                            rowGap: s(5),
                        }}
                        onPress={(item) =>
                            navigation.navigate('MovieDetails', {
                                movieId: item.id as number,
                            })
                        }
                    />
                </View>
            </ScrollView>
        </>
    );
};
