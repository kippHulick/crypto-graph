import React from 'react'
import { Card } from 'react-bootstrap'
import CoinTable from './CoinTable'

function CoinPage() {
  return (
    <Card style={{
        margin: 'auto',
        marginBottom: '20px',
        width: '70vw',
        boxShadow: '0px 0px 5px #18191b',
        boxSizing: 'border-box',
        padding: '20px',
        borderRadius: '8px'
    }}>
        <h1 className='text-center' >Cryptocurrencies</h1>
        <CoinTable />
    </Card>
  )
}

export default CoinPage