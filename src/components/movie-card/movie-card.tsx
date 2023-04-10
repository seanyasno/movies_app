import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { RootStackParamList } from '../../types';
import { UserRatingBar } from '../user-rating-bar/user-rating-bar';

type Props = {
    id: number;
    title: string;
    releaseDate: string;
    posterPath: string;
    vote_average: number;
    width?: number;
    height?: number;
};

export const MovieCard: React.FC<Props> = (props) => {
    const {
        id,
        title,
        releaseDate,
        posterPath,
        vote_average,
        width = 100,
        height = 100,
    } = props;
    const imagePath = `https://image.tmdb.org/t/p/original${posterPath}`;
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const dateFormat = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('MovieDetails', {
                        movieId: id,
                    })
                }
            >
                <View
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                        backgroundColor: 'white',
                        borderRadius: 36,
                    }}
                >
                    <FastImage
                        source={{ uri: imagePath }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                            width,
                            height,
                            borderRadius: 36,
                        }}
                    />
                </View>
            </TouchableOpacity>

            <Text
                style={{
                    fontWeight: 'bold',
                    marginTop: s(20),
                    fontSize: s(16),
                    textAlign: 'center',
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    color: '#25365047',
                    fontSize: s(12),
                    marginTop: s(5),
                    marginBottom: s(20),
                }}
            >
                {dateFormat.format(new Date(releaseDate))}
            </Text>

            <UserRatingBar value={vote_average * 10} />
        </View>
    );
};
