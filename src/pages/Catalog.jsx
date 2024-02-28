import React, { useEffect, useRef } from 'react'
import PageHeader from '../components/page-header/PageHeader'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { category as cate } from '../api'
import MovieGrid from '../components/movie-grid/MovieGrid'
const Catalog = () => {
    const scrollRef = useRef()
    const { category } = useParams()
    useEffect(() => {
        scrollRef.current.scrollIntoView({ block: 'start' })
    }, [category])
    return (
        <div ref={scrollRef}>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>

            <div className='container'>
                <div className='section mb-3'>
                    <MovieGrid category={category} />
                </div>
            </div>
        </div>
    )
}

export default Catalog
