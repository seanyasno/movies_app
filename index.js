/**
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';
import { CustomAppbar } from './src/components';
import { TempScreen } from './src/screens';

const { Navigator, Screen } = createNativeStackNavigator();

const Main = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Navigator
                    initialRouteName={'Temp'}
                    screenOptions={{
                        header: (props) => (
                            <CustomAppbar title={props.route.name} />
                        ),
                    }}
                >
                    <Screen name={'Temp'} component={TempScreen} />
                </Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
