import React from 'react';

import { Linking, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { TrailerButton } from '../';
import { UserRatingBar } from '../../../../components';

type Props = {
    voteAverage: number;
    trailerUrl: string;
};

export const ElevatingSection: React.FC<Props> = (props) => {
    const { voteAverage, trailerUrl } = props;
    const { width } = useWindowDimensions();

    return (
        <View style={styles(width).container}>
            <UserRatingBar value={voteAverage * 10} />
            <Text style={styles().userScore}>User Score</Text>
            <TrailerButton onPress={() => Linking.openURL(trailerUrl)} />
        </View>
    );
};

const styles = (width?: number) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            top: (width ?? 0) * (4 / 3) - s(45),
            right: 0,
            height: s(90),
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: s(25),
            borderTopLeftRadius: s(200),
            borderBottomLeftRadius: s(200),
            columnGap: s(14),
            shadowColor: '#00000040',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 5,
        },
        userScore: {
            color: '#25365061',
            width: s(36),
            textAlign: 'center',
            fontSize: s(12),
        },
    });
