import React, { useEffect, useState, useRef} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import Button, {OutlineButton} from '../button/Button'
import Modal, {ModalContent} from '../modal/Modal'
import SwiperCore, { Autoplay } from 'swiper'
import './hero-slide.scss'
import apiConfig from '../../api/apiConfig'
import { apiGetMovieList, apiGetVideos, movieType } from '../../api'
import { useHistory } from 'react-router-dom'
const HeroSlide = () => {

    const [movieItems, setMovieItems] = useState([])
    
    useEffect(() => {
        const fetchMovieData = async() => {
            const res = await apiGetMovieList(movieType.popular)
            setMovieItems(res.data.results.slice(1, 4))
        }
        fetchMovieData()
    }, []);

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                slidesPerView={1}    
            >
                {movieItems?.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)}
        </div>
    )
}
export const HeroSlideItem = props => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchVideoData = async() => {
            const res = await apiGetVideos(item.id)
            setVideos(res.data.results)
            
        }   
        fetchVideoData()
    }, []);
    let history = useHistory()
    const item = props.item
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`)
        // const videos = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apiConfig.apiKey}`)
        // const videosJSON = await videos.json()
        if (videos.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos[0].key;
            modal.querySelector('.modal__content > iframe')?.setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active')
        // console.log(videosJSON)
    }
    return (
        <div className={`hero-slide__item ${props.className}`} style={{backgroundImage: `url(${background})`}}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item 

    const iframeRef = useRef(null)

    const onClose = () => iframeRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide
