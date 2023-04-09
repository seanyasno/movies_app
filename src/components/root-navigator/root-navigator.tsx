import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, MovieDetailsScreen, SearchScreen } from '../../screens';
import { RootStackParamList } from '../../types';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <Navigator initialRouteName={'Home'}>
            <Screen
                name={'Home'}
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name={'MovieDetails'}
                component={MovieDetailsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name={'Search'}
                component={SearchScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    );
};
