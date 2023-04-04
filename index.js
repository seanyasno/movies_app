/**
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';
import { HomeScreen, TempScreen } from './src/screens';

const { Navigator, Screen } = createNativeStackNavigator();

const client = new QueryClient();

const Main = () => {
    return (
        <PaperProvider>
            <QueryClientProvider client={client}>
                <NavigationContainer>
                    <Navigator initialRouteName={'Home'}>
                        <Screen name={'Temp'} component={TempScreen} />
                        <Screen
                            name={'Home'}
                            component={HomeScreen}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Navigator>
                </NavigationContainer>
            </QueryClientProvider>
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
