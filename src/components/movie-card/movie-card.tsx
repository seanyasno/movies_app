import React from 'react';

import { Image, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

type Props = {
    title: string;
    releaseDate: string;
    posterPath: string;
    vote_average: number;
    width?: number;
    height?: number;
};

export const MovieCard: React.FC<Props> = (props) => {
    const {
        title,
        releaseDate,
        posterPath,
        vote_average,
        width = 100,
        height = 100,
    } = props;
    const imagePath = `https://image.tmdb.org/t/p/original${posterPath}`;

    return (
        <View
            style={{
                alignItems: 'center',
            }}
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
            <Text
                variant={'titleLarge'}
                style={{
                    fontWeight: 'bold',
                    marginTop: s(20),
                    marginBottom: s(20),
                }}
            >
                {title}
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
                    fontSize: s(11),
                    alignSelf: 'flex-start',
                    paddingTop: s(2),
                }}
                progressValueFontSize={s(20)}
                radius={s(30)}
                activeStrokeWidth={s(5)}
                inActiveStrokeWidth={s(5)}
            />
        </View>
    );
};
