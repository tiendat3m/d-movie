
import axiosClient from "../axios";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}


export const apiGetMovieList = (type, params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/movie/' + movieType[type],
            params
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const apiGetVideos = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: 'movie/' + id + '/videos' ,
            params: {id: id}
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const apiGetTvList = (type, params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: 'tv/' + tvType[type] ,
            params
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const similar = (cate, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: cate + '/' + id + '/similar',
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const search = (cate, params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: 'search/' + category[cate],
            params
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})
