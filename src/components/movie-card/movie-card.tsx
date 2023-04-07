import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { RootStackParamList } from '../../types';

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
                    <Image
                        source={{
                            uri: imagePath,
                            width: width,
                            height: height,
                        }}
                        resizeMode={'cover'}
                        style={{
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

            <CircularProgress
                value={vote_average * 10}
                maxValue={100}
                activeStrokeColor={'#1BB3E0'}
                activeStrokeSecondaryColor={'#16D1AE'}
                inActiveStrokeColor={'#ECECEC'}
                progressValueColor={'#253650'}
                valueSuffix={'%'}
                valueSuffixStyle={{
                    fontSize: s(8),
                    alignSelf: 'flex-start',
                    paddingTop: s(2),
                }}
                progressValueFontSize={s(16)}
                radius={s(22)}
                activeStrokeWidth={s(3)}
                inActiveStrokeWidth={s(3)}
            />
        </View>
    );
};
