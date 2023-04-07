import React from 'react';

import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    onPress?: (event: GestureResponderEvent) => void;
};

export const TrailerButton: React.FC<Props> = (props) => {
    const { onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Icon name={'play-outline'} size={s(20)} />
                <Button
                    color={'#253650'}
                    textColor={'#253650'}
                    style={styles.button}
                >
                    Play Trailer
                </Button>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
    },
});
