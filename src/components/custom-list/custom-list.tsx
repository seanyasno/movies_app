import React from 'react';

import { FlashList, FlashListProps } from '@shopify/flash-list';
import { isUndefined } from 'lodash';
import {
    ImageURISource,
    ListRenderItem,
    ScrollView,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
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
    onPress?: (item: Item) => void;
    horizontal?: boolean;
};

export const CustomList: React.FC<Props> = (props) => {
    const {
        imageProps = { width: 100, height: 100 },
        containerStyle,
        imageStyle,
        onPress,
        horizontal,
    } = props;

    return (
        <FlashList
            data={props.data}
            estimatedItemSize={20}
            horizontal={horizontal}
            renderItem={({ item }) => {
                const { imageUri, title, description } = item;

                return (
                    <TouchableOpacity
                        style={containerStyle}
                        disabled={isUndefined(onPress)}
                        onPress={() => onPress?.(item)}
                    >
                        <View style={styles.imageContainer}>
                            <FastImage
                                style={[imageStyle, imageProps]}
                                source={{ uri: imageUri }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>

                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </TouchableOpacity>
                );
            }}
        />
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
