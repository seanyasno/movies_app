import { MediaType } from '../../types';
import { tmdbClient } from '../../utils';

export const getTrendingMediaByType = async (
    mediaType: MediaType = MediaType.MOVIE
) => {
    const urlPath = `/trending/${mediaType}/day`;
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

export const getMediaTrailers = async (
    mediaId: number,
    mediaType: MediaType
) => {
    const urlPath = `/${mediaType}/${mediaId}/videos`;
    return tmdbClient.get(urlPath);
};

export const getMediaDetailsByType = async (
    mediaId: number,
    mediaType: MediaType
) => {
    const urlPath = `/${mediaType}/${mediaId}`;
    return tmdbClient.get(urlPath);
};
