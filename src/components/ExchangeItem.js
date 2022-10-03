import React from 'react'
import { ListGroup } from 'react-bootstrap';

function ExchangeItem({coins}) {
  return (
    <ListGroup>
        {coins.map(coinObj => {
            return <ListGroup.Item key={coinObj.exchange_id} className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{coinObj.name}</div>
                    Exchange Id: {coinObj.exchange_id}
                </div>
                Website: <a href={coinObj.website}>{coinObj.website}</a>
            </ListGroup.Item>
        })}
    </ListGroup>
  )
}

export default ExchangeItem