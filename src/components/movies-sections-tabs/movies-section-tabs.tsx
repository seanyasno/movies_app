import React, { useState } from 'react';

import { useWindowDimensions } from 'react-native';
import { s } from 'react-native-size-matters';
import { SceneMap, TabView } from 'react-native-tab-view';

import '../../hooks';
import {
    CustomTabBar,
    MemoizedLatestMoviesSection,
    MemoizedPopularMoviesSection,
    MemoizedTrendingMoviesSection,
} from './components';

export const MoviesSectionTabs: React.FC = () => {
    const { width } = useWindowDimensions();
    const [currentTab, setCurrentTab] = useState(0);

    const scenes = SceneMap({
        trending: MemoizedTrendingMoviesSection,
        latest: MemoizedLatestMoviesSection,
        popular: MemoizedPopularMoviesSection,
    });

    const navigationState = {
        index: currentTab,
        routes: [
            {
                key: 'trending',
                title: 'Trending',
            },
            {
                key: 'latest',
                title: 'Latest',
            },
            {
                key: 'popular',
                title: 'Popular',
            },
        ],
    };

    return (
        <TabView
            renderScene={scenes}
            navigationState={navigationState}
            renderTabBar={(props) => <CustomTabBar {...props} />}
            onIndexChange={(index) => setCurrentTab(index)}
            initialLayout={{ width }}
            swipeEnabled={false}
            style={{
                backgroundColor: '#fff',
            }}
            pagerStyle={{
                marginTop: s(10),
            }}
        />
    );
};
