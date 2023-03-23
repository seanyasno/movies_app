/**
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import App from './App';
import { name as appName } from './app.json';

const { Navigator, Screen } = createNativeStackNavigator();

const Main = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Navigator
                    initialRouteName={'App'}
                    // screenOptions={{
                    //     // header: (props) => (
                    //     //     <CustomAppbar title={props.route.name} />
                    //     // ),
                    // }}
                >
                    <Screen name={'App'} component={App} />
                </Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
