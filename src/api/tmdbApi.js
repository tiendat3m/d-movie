
import axiosClient from "../axios";

export const apiGetMovieList = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/movie/popular',
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})

export const apiGetVideos = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/movie/' + id + '/videos' ,
            params: {id: id}
        })
        resolve(response)
    }catch (error) {
        reject(error)
    }
})