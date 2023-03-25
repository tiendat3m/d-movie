import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './header.scss'
import logo from '../../assets/tmovie.png'

export const headerNav =  [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
]

const Header = () => {
    const { pathname } = useLocation()
    const { headerRef } = useRef(null)
    const active = headerNav.findIndex(e => e.path === pathname)

    return (
        <div ref={headerRef} className='header'>
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <Link to='/'>dMovies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((item, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <Link to={item.path}>
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header
