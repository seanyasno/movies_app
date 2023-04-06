import React from 'react';

import { Animated, I18nManager } from 'react-native';
import { SceneRendererProps } from 'react-native-tab-view';

type State = {
    routes: {
        key: string;
        title: string;
    }[];
    index: number;
};

export const CustomTabBarIndicator = (
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
