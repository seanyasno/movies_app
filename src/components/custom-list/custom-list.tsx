import React from 'react';

import { isUndefined } from 'lodash';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    ImageURISource,
    ScrollView,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

type Item = {
    imageUri: string;
    title?: string;
    description?: string;
    [args: string]: unknown;
};

type Props = {
    data: Item[];
    containerStyle?: StyleProp<ViewStyle>;
    imageProps?: Omit<ImageURISource, 'uri'>;
    imageStyle?: StyleProp<ImageStyle>;
    scrollProps?: ScrollView['props'];
    onPress?: (item: Item) => void;
};

export const CustomList: React.FC<Props> = (props) => {
    const {
        imageProps = { width: 100, height: 100 },
        containerStyle,
        imageStyle,
        onPress,
    } = props;

    return (
        <ScrollView {...props.scrollProps}>
            {props.data.map((item, index) => {
                const { imageUri, title, description } = item;

                return (
                    <TouchableOpacity
                        key={index}
                        style={containerStyle}
                        disabled={isUndefined(onPress)}
                        onPress={() => onPress?.(item)}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: imageUri,
                                    ...imageProps,
                                }}
                                resizeMode={'cover'}
                                style={imageStyle}
                            />
                        </View>

                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        elevation: 10,
        borderRadius: s(50),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        color: '#253650',
        maxWidth: s(80),
        textAlign: 'center',
        fontWeight: 'bold',
        maxHeight: s(30),
    },
    description: {
        color: '#25365047',
        maxWidth: s(80),
        textAlign: 'center',
        maxHeight: s(30),
    },
});
