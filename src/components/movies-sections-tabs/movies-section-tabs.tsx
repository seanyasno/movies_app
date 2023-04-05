import React, { useState } from 'react';

import { Animated, I18nManager, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import {
    SceneMap,
    SceneRendererProps,
    TabBar,
    TabView,
} from 'react-native-tab-view';

import '../../hooks';
import {
    MemoizedLatestMoviesSection,
    MemoizedPopularMoviesSection,
    MemoizedTrendingMoviesSection,
} from './sections';

export const MoviesSectionTabs: React.FC = () => {
    const { width } = useWindowDimensions();
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <TabView
            navigationState={{
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
            }}
            renderScene={SceneMap({
                trending: MemoizedTrendingMoviesSection,
                latest: MemoizedLatestMoviesSection,
                popular: MemoizedPopularMoviesSection,
            })}
            renderTabBar={(props) => <CustomTabBar {...props} />}
            onIndexChange={(index) => setCurrentTab(index)}
            initialLayout={{ width }}
            swipeEnabled={false}
            style={{
                backgroundColor: '#fff',
            }}
        />
    );
};

type State = {
    routes: {
        key: string;
        title: string;
    }[];
    index: number;
};

const CustomTabBar: React.FC<
    SceneRendererProps & { navigationState: State }
> = (props) => {
    const renderIndicator = (
        props: SceneRendererProps & {
            navigationState: State;
            getTabWidth: (i: number) => number;
        }
    ) => {
        const { position, navigationState, getTabWidth } = props;
        const inputRange = [
            0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2,
        ];

        const translateX = position.interpolate({
            inputRange: inputRange,
            outputRange: inputRange.map((x) => {
                const i = Math.trunc(x);
                return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
            }),
        });

        return (
            <Animated.View
                style={[
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    },
                    {
                        width: `${100 / navigationState.routes.length}%`,
                        transform: [{ translateX }] as any,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            backgroundColor: '#1BB3E0',
                            width: 40,
                            height: 4,
                            borderRadius: 10,
                        },
                    ]}
                />
            </Animated.View>
        );
    };

    return (
        <TabBar
            {...props}
            renderIndicator={renderIndicator}
            renderLabel={({ route, focused }) => (
                <Text
                    key={route.key}
                    style={{
                        color: focused ? '#253650' : '#25365047',
                        fontWeight: focused ? 'bold' : 'normal',
                        fontSize: s(16),
                        flex: 1,
                        padding: 4,
                    }}
                >
                    {route.title}
                </Text>
            )}
            style={{
                backgroundColor: '#fff',
                elevation: 0,
                shadowColor: 'transparent',
            }}
        />
    );
};
