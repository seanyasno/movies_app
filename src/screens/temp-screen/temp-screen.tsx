import React from 'react';

import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const TempScreen: React.FC = () => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background,
            }}
        >
            <Text variant={'headlineLarge'}>Home Screen</Text>
        </View>
    );
};
