
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


export const apiGetMovieList = (type) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/movie/' + movieType[type],
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

export const apiGetTvList = (type) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: 'tv/' + tvType[type] ,
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const similar = (category, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: category + '/' + id + '/similar',
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})
