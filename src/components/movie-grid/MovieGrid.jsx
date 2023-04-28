import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { category, movieType, tvType } from '../../api'
import MovieCard from '../movie-card/MovieCard'
import { apiGetMovieList, apiGetTvList, search } from '../../api'

import './movie-grid.scss'
import { OutlineButton } from '../button/Button'
const MovieGrid = props => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const { keyword } = useParams

    useEffect(() => {
        const fetchListData = async () => {
            let res = null
            if(keyword === undefined) {
                const params = {}
                switch(props.category) {
                    case category.movie :
                        res = await apiGetMovieList(movieType.upcoming, params)
                        break;
                    default: 
                        res = await apiGetTvList(tvType.popular, params)
                }
            }else {
                const params = {
                    query: keyword
                }
                res = await search(props.category, params)
            }
            setItems(res.data.results)
            setTotalPages(res.data.total_pages)
        }
        fetchListData()
    },[props.category, keyword])

    const loadMore = async() => {
        let res = null
            if(keyword === undefined) {
                const params = {
                    page: page + 1
                }
                switch(props.category) {
                    case category.movie :
                        res = await apiGetMovieList(movieType.upcoming, params)
                        break;
                    default: 
                        res = await apiGetTvList(tvType.popular, params)
                }
            }else {
                const params = {
                    page: page + 1,
                    query: keyword
                }
                res = await search(props.category, params)
            }
            setItems([...items, ...res.data.results])
            setPage(page + 1)
    }

    return (
        <>
            <div className='movie-grid'>
            {items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)}
            </div>
            {
                page < totalPages ? (
                    <div className='movie-grid__loadmore'>
                        <OutlineButton className='small' onClick={loadMore}>Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

export default MovieGrid
