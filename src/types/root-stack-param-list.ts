import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    MovieDetails?: {
        movieId: number;
    };
};

export type HomeStackNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export type MovieDetailsStackNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    'MovieDetails'
>;
