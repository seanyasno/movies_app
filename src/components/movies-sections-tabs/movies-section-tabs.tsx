import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SceneMap, TabView } from 'react-native-tab-view';

import { MovieCardCarousel } from '../';
import { getTrendingMovies } from '../../requests';

export const MoviesSectionTabs: React.FC = () => {
    const { width } = useWindowDimensions();

    const { data, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const response = await getTrendingMovies();
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
        <TabView
            navigationState={{
                index: 0,
                routes: [
                    {
                        key: 'first',
                        title: 'First',
                    },
                    {
                        key: 'second',
                        title: 'Second',
                    },
                ],
            }}
            renderScene={SceneMap({
                first: () => <MovieCardCarousel movies={data} />,
                second: () => <MovieCardCarousel movies={data} />,
            })}
            onIndexChange={() => {}}
            initialLayout={{ width }}
            swipeEnabled={false}
        />
    );
};
