import React from 'react'
import { ListGroup } from 'react-bootstrap';
import coinIcons from '../data/coinIcons.json'

function CoinItem({coins, loading}) {
    if(loading){
        return <h2>Loading</h2>
    }
  return (
    <ListGroup>
        {coins.map(coinObj => {
            let coinIcon = coinIcons.filter(coin => coin.asset_id === coinObj.asset_id)
            return <ListGroup.Item key={coinObj.asset_id} className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{coinObj.name}</div>
                    Asset Id: {coinObj.asset_id}

                    <img src={coinIcon.url} alt=''></img>

                </div>
                <div>
                    <p>One Hour Volume: ${coinObj.volume_1hrs_usd}</p>
                    {coinObj.price_usd ? <p>Current Price: ${coinObj.price_usd}</p> : <></>}
                    
                </div>
            </ListGroup.Item>
        })}
    </ListGroup>
  )
}

export default CoinItem