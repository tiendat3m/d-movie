import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { category, movieType, tvType } from '../../api'
import MovieCard from '../movie-card/MovieCard'
import Input from '../input/Input'
import Button from '../button/Button'
import { apiGetMovieList, apiGetTvList, search } from '../../api'

import './movie-grid.scss'
import { OutlineButton } from '../button/Button'
const MovieGrid = props => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const { keyword } = useParams()

    useEffect(() => {
        const getList = async () => {
            let res = null
            if (keyword === undefined) {
                const params = {}
                switch (props.category) {
                    case category.movie:
                        res = await apiGetMovieList(movieType.upcoming, { params })
                        // console.log(res)
                        break;
                    default:
                        res = await apiGetTvList(tvType.popular, { params })
                }
            } else {
                const params = {
                    query: keyword
                }
                res = await search(props.category, { params })

                console.log(res)
            }
            setItems(res?.data?.results)
            setTotalPages(res?.data?.total_pages)
        }
        getList()
    }, [props.category, keyword])

    const loadMore = async () => {
        let res = null
        if (keyword === undefined) {
            const params = {
                page: page + 1
            }
            switch (props.category) {
                case category.movie:
                    res = await apiGetMovieList(movieType.upcoming, { params })
                    break;
                default:
                    res = await apiGetTvList(tvType.popular, { params })
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            res = await search(props.category, { params })
        }
        setItems([...items, ...res.data.results])
        setPage(page + 1)
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={props.keyword} />
            </div>
            <div className='movie-grid'>
                {items.map((item, i) => <MovieCard category={props.category} item={item} key={i} />)}
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
const MovieSearch = props => {
    // console.log(props.category)

    const history = useHistory();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');


    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            // console.log(e.keyCode)
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);


    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid
