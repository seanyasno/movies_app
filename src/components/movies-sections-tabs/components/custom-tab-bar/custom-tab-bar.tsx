import React from 'react';

import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import { SceneRendererProps, TabBar } from 'react-native-tab-view';

import { CustomTabBarIndicator } from '../';

type State = {
    routes: {
        key: string;
        title: string;
    }[];
    index: number;
};

export const CustomTabBar: React.FC<
    SceneRendererProps & { navigationState: State }
> = (props) => {
    return (
        <TabBar
            {...props}
            renderIndicator={CustomTabBarIndicator}
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
