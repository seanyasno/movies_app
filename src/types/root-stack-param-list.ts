import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    MovieDetails?: {
        movieId: number;
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
