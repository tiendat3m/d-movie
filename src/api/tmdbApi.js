import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv',
}

export const movieType = {
    upcoming: 'upcoming',
    poppular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    poppular: 'popular',
    top_rated: 'top_rated',
    on_air: 'on_air',
}

const tmdbApi = {
    getMovieList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params)
    },
    getTvList: (type, params) => {
        const url = 'tv/' + movieType[type];
        return axiosClient.get(url, params)
    },
    getVideoList: (cate, id) => {
        const url = category[cate] + '/' + id + '/video';
        return axiosClient.get(url, {params: {}})
    },
    search: (cate, params) => {
        const url = 'search' + category[cate];
        return axiosClient.get(url, params)
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params)
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}})
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}})
    }
}

export default tmdbApi