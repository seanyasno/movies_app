import React from 'react';

import { StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { s } from 'react-native-size-matters';

type Props = {
    value: number;
};

export const UserRatingBar: React.FC<Props> = (props) => {
    const { value } = props;
    return (
        <CircularProgress
            value={value}
            maxValue={100}
            activeStrokeColor={'#1BB3E0'}
            activeStrokeSecondaryColor={'#16D1AE'}
            inActiveStrokeColor={'#ECECEC'}
            progressValueColor={'#253650'}
            valueSuffix={'%'}
            valueSuffixStyle={styles.suffix}
            progressValueFontSize={s(16)}
            radius={s(22)}
            activeStrokeWidth={s(3)}
            inActiveStrokeWidth={s(3)}
        />
    );
};

const styles = StyleSheet.create({
    suffix: {
        fontSize: s(8),
        alignSelf: 'flex-start',
        paddingTop: s(2),
    },
});
