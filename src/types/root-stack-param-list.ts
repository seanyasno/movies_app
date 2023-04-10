import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MediaType } from './media-type';

export type RootStackParamList = {
    Home: undefined;
    MovieDetails?: {
        mediaId: number;
        mediaType: MediaType;
    };
    Search: undefined;
};

export type HomeStackNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export type MovieDetailsStackNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    'MovieDetails'
>;
