import { tmdbClient } from '../../utils';

export const getTrendingMovies = async () => {
    const urlPath = '/trending/movie/day';
    return tmdbClient.get(urlPath);
};
