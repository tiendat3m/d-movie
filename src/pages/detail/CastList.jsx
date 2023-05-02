import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { apiCredit } from '../../api'
import apiConfig from '../../api/apiConfig'

const CastList = () => {
    const { category, id } = useParams()
    const [casts, setCasts] = useState([])
    useEffect(() => {
        const getCredits = async() => {
            const res = await apiCredit(category, id)
            setCasts(res.data.cast.slice(0, 5))
        }
        getCredits()
    }, [category, id])
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList
