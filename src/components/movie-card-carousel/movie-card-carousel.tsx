import React from 'react';

import { useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { TAnimationStyle } from 'react-native-reanimated-carousel/lib/typescript/layouts/BaseLayout';
import { s, scale } from 'react-native-size-matters';

import { MovieCard } from '../movie-card/movie-card';

type Props = {
    movies: [];
};

export const MovieCardCarousel: React.FC<Props> = (props) => {
    const { movies } = props;
    const { width } = useWindowDimensions();

    const itemWidth = s(200);
    const itemHeight = s(288);
    const centerOffset = width / 2 - itemWidth / 2;

    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';

            const itemGap = interpolate(value, [-1, 0, 1], [30, 0, -30]);

            const translateX =
                interpolate(value, [-1, 0, 1], [-itemWidth, 0, itemWidth]) +
                centerOffset -
                itemGap;

            const translateY = interpolate(value, [-0.5, 0, 0.5], [10, 40, 10]);

            const scale = interpolate(
                value,
                [-1, -0.5, 0, 0.5, 1],
                [0.8, 0.85, 1.1, 0.85, 0.8]
            );

            return {
                transform: [{ translateX }, { translateY }, { scale }],
            };
        },
        [centerOffset, itemWidth]
    );

    return (
        <GestureHandlerRootView>
            <Carousel
                data={
                    movies as {
                        title: string;
                        release_date: string;
                        poster_path: string;
                        vote_average: number;
                    }[]
                }
                renderItem={({ item }) => {
                    return (
                        <MovieCard
                            title={item.title}
                            releaseDate={item.release_date}
                            posterPath={item.poster_path}
                            vote_average={item.vote_average}
                            width={itemWidth}
                            height={itemHeight}
                        />
                    );
                }}
                width={itemWidth}
                style={{
                    width,
                }}
                customAnimation={animationStyle}
            />
        </GestureHandlerRootView>
    );
};
