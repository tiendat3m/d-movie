import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { apiGetMovieList, apiGetTvList, similar, movieType, category } from '../../api'
import apiConfig from '../../api/apiConfig'
import PropTypes from 'prop-types'
import './movie-list.scss'
import MovieCard from '../movie-card/MovieCard'
const MovieList = props => {
    console.log(props)
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchListData = async() => {
            let res = null
            console.log(res)
            // const params = {}

            if(props.type !== 'similar') {
                switch(props.category) {
                    case category.movie: 
                        res = await apiGetMovieList(props.type)
                        // console.log(res)
                        break;
                    default: 
                        res = await apiGetTvList(props.type)
                        // console.log(res)
                }
            } else {
                res = await similar(props.category, props.id)
                console.log(res)
            }
            setItems(res.data.results)
        }
        fetchListData()
    }, [])

    return (
        <div className='movie-list'>
            <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList
