import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { numberWithCommas } from '../CoinList'
import 'react-alice-carousel/lib/alice-carousel.css'

function Carousel() {

    const [trending, setTrending] = useState([])

    useEffect(() => {
        const fetchTrending = async () => {
            let data = await fetch(TrendingCoins()).then(res => res.json())
            console.log(data)
            setTrending(data)
        }

        fetchTrending()
    }, [])

    const items = trending.map(coin => {
        let profit = coin?.price_change_percentage_24h >= 0
        return (

        <Link style={{
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
                $ {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>

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