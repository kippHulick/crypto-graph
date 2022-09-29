import React from 'react'
import { useState, useEffect } from 'react';
import env from "react-dotenv";

function CoinList() {

    useEffect(() => {
        const url = `https:///rest.coinapi.io/v1/exchanges`
        const headers = {'X-CoinAPI-Key': env.API_KEY}

        const fetchCoins = async () => { 
        //https://api.coingecko.com/api/v3/coins/list
        let response = await fetch(url, {headers})
        const json = await response.json()
        
        console.log(json)
        // setCoins({coins: json})
        }

        fetchCoins()
  })

  return (
    <div>CoinList</div>
  )
}

export default CoinList