import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { apiGetMovieList, apiGetTvList, similar, category } from '../../api'
import PropTypes from 'prop-types'
import './movie-list.scss'
import MovieCard from '../movie-card/MovieCard'
const MovieList = props => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getList = async() => {
            let res = null
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
            }
            setItems(res.data.results)
        }
        getList()
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
