import { tmdbClient } from '../../utils';

export const getTrendingMovies = async () => {
    const urlPath = '/trending/movie/day';
    return tmdbClient.get(urlPath);
};

export const getLatestMovies = async () => {
    const urlPath = '/movie/now_playing';
    return tmdbClient.get(urlPath);
};

export const getPopularMovies = async () => {
    const urlPath = '/movie/popular';
    return tmdbClient.get(urlPath);
};

export const getMovieDetails = async (movieId: number) => {
    const urlPath = `/movie/${movieId}`;
    return tmdbClient.get(urlPath);
};

export const getMovieTrailers = async (movieId: number) => {
    const urlPath = `/movie/${movieId}/videos`;
    return tmdbClient.get(urlPath);
};
