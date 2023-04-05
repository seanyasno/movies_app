import axios from 'axios';

const tmdbApiKey = '705f9bb5b072c6425cdc30e2638d3975';

export const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: tmdbApiKey,
    },
});
