/**
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';
import { RootNavigator } from './src/components';

const client = new QueryClient();

const Main = () => {
    return (
        <PaperProvider
            theme={{
                dark: false,
            }}
        >
            <QueryClientProvider client={client}>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
