import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import env from "react-dotenv";
// import { ListGroup } from 'react-bootstrap';

import CoinItem from './CoinItem';
import ErrorBoundary from './ErrorBoundary';
import coinList from '../data/coinData.json'
import { updateCoins } from '../reducers/CoinReducer';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinList() {

    const dispatch = useDispatch()

    const coins = useSelector(state => state.coins.coins)
    
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [coinsPerPage, setCoinsPerPage] = useState(10)
    const [active, setActive] = useState(1)

    useEffect(() => {
        const url = `${env.API_URL}/trades/latest`
        const headers = {'X-CoinAPI-Key': env.API_KEY}

        const fetchCoins = async () => { 
            setLoading(true)
            console.log('Making api call')
            //https://api.coingecko.com/api/v3/coins/list
            let response = await fetch(url, {headers})
            const json = await response.json()
            
            console.log(json)
            updateCoins(json)
            setLoading(false)
        }

        if(!coinList) {
            fetchCoins()
        }
        else if (coins.length < 1) {
            dispatch(updateCoins(coinList))
            console.log(coins)
        }

    },[])

    const indexOfLastCoin = currentPage * coinsPerPage
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage
    const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin)

    const paginate = (number) => setCurrentPage(number)


  return (
    <>
    <h1>Coin List</h1>
    <h4>This page lists all the coins tracked by CoinAPI that is being used in this application</h4>

    <ErrorBoundary>
        <CoinItem coins={currentCoins} loading={loading}/>
    </ErrorBoundary>

    </>
  )
}

export default CoinList