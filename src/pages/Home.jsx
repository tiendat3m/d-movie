import React from 'react'
import HeroSlide from '../components/hero-slide/HeroSlide'
import { OutlineButton } from '../components/button/Button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { category, movieType } from '../api'
import MovieList from '../components/movie-list/MovieList'
const Home = () => {

    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className='small'>View More</OutlineButton>
                        </Link>
                    </div>
                    <div>
                        <MovieList category={category.movie} type={movieType.popular} />
                    </div>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className='small'>View More</OutlineButton>
                        </Link>
                    </div>
                    <div>
                        <MovieList category={category.movie} type={movieType.top_rated} />
                    </div>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className='small'>View More</OutlineButton>
                        </Link>
                    </div>
                    <div>
                        <MovieList category={category.tv} type={movieType.popular} />
                    </div>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className='small'>View More</OutlineButton>
                        </Link>
                    </div>
                    <div>
                        <MovieList category={category.tv} type={movieType.top_rated} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
