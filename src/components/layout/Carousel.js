import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { numberWithCommas } from '../CoinTable'
import 'react-alice-carousel/lib/alice-carousel.css'

function Carousel() {

    const navigate = useNavigate()
    const [trending, setTrending] = useState([])

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                let data = await fetch(TrendingCoins()).then(res => res.json())
                setTrending(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchTrending()
    }, [])

    const items = trending.map(coin => {
        let profit = coin?.price_change_percentage_24h >= 0
        return (

        <div onClick={()=>navigate(`/coins/${coin.id}`)} style={{
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            textTransform: 'uppercase',
            textDecoration: 'none'
        }}>
            <img 
                src={coin?.image}
                alt={coin.name}
                height='40'
                style={{ marginBottom: 10 }}
            />
            <span>
                {coin?.symbol}
                &nbsp;
                <span 
                    style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : 'red',
                        fontWeight: 500
                    }}
                >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>
            <span>
                ${numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </div>

        )
    })

    const responsive = {
        0: {
            items: 4
        },
        512: {
            items: 6
        }
    }
    

  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '10px'
    }}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    </div>
  )
}

export default Carousel