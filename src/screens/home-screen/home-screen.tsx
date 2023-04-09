import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { MoviesSectionTabs } from '../../components';
import { RootStackParamList } from '../../types';

export const HomeScreen: React.FC = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const title = 'A lot of movies, TV shows and people to discover.';

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: '#fff',
                }}
            >
                <Appbar.Action icon={'menu'} onPress={() => {}} />
                <Appbar.Content title={''} />
                <Appbar.Action
                    icon={'magnify'}
                    onPress={() => navigation.navigate('Search')}
                />
            </Appbar.Header>
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text
                    style={{
                        fontSize: s(26),
                        paddingHorizontal: s(10),
                        marginBottom: s(14),
                    }}
                >
                    {title}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                }}
            >
                <MoviesSectionTabs />
            </View>
        </>
    );
};
