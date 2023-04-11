import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isEqual } from 'lodash';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { CustomList } from '../../../../components';
import { MediaType, RootStackParamList } from '../../../../types';

type Props = {
    data: {
        id: number;
        imageUri: string;
        title: string;
        description: string;
    }[];
    title?: string;
    mediaType: MediaType;
};

export const SectionList: React.FC<Props> = (props) => {
    const { data, title, mediaType } = props;
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'Search'>
        >();

    const handlePress = useCallback(
        (item) =>
            navigation.navigate('MovieDetails', {
                mediaId: item.id as number,
                mediaType,
            }),
        [mediaType, navigation]
    );

    return (
        <View>
            {title && (
                <View>
                    <Text
                        style={{
                            color: '#253650',
                            fontSize: s(16),
                            fontWeight: 'bold',
                        }}
                    >
                        {title}
                    </Text>
                </View>
            )}

            <CustomList
                data={data}
                horizontal
                imageProps={{
                    width: s(120),
                    height: s(154),
                }}
                imageStyle={{
                    borderRadius: s(18),
                    marginBottom: s(5),
                }}
                containerStyle={{
                    alignItems: 'center',
                    marginRight: s(10),
                    marginTop: s(10),
                    rowGap: s(5),
                }}
                onPress={handlePress}
            />
        </View>
    );
};

export const MemoizedSectionList = React.memo(
    SectionList,
    (previousProps, nextProps) => {
        return (
            isEqual(previousProps.data, nextProps.data) &&
            isEqual(previousProps.title, nextProps.title)
        );
    }
);
