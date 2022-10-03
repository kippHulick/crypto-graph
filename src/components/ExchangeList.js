import React from 'react'
import { useState, useEffect } from 'react';

import env from "react-dotenv";
import { ListGroup } from 'react-bootstrap';

import CoinItem from './CoinItem';
import ErrorBoundary from './ErrorBoundary';
import coinList from '../data/exchangeList.json'

function CoinList() {

    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        const url = `${env.API_URL}/exchanges`
        const headers = {'X-CoinAPI-Key': env.API_KEY}

        const fetchExchanges = async () => { 
            console.log('Making api call')
            //https://api.coingecko.com/api/v3/coins/list
            let response = await fetch(url, {headers})
            const json = await response.json()
            
            console.log(json)
            setExchanges(json)
        }

        if(coinList) {
            fetchExchanges()
        }
        else{
            setExchanges(coinList)
        }
  },[])

  return (
    <>
    <h1>Coin List</h1>
    <h4>This page lists all the coins tracked by CoinAPI that is being used in this application</h4>

    <ErrorBoundary>
        {/* Make an exchange component */}
        <CoinItem coins={exchanges}/>
    </ErrorBoundary>

    </>
  )
}

export default CoinList