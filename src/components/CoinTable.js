import React, { useEffect, useState } from 'react'
import { Container, Spinner, Table, Card } from 'react-bootstrap';
import { Pagination } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api'
import { updateCoins } from '../reducers/CoinReducer'
import './styles/coinTable.css'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinTable() {
    const coins = useSelector(state => state.coins.coins)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    useEffect(() => {
        setLoading(true)
        const fetchCoins = async () => {
            try {
                let data = await fetch(CoinList()).then(res => res.json())
                dispatch(updateCoins(data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchCoins()

        setLoading(false)
      }, [])

    const handleSearch = () => coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))

  return (
    loading ? (
        <Spinner animation='border' style={{ position: "fixed", top: "50%", left: "50%" }} />
    ) : (
        <Container className='text-center'>
            <h4 style={{margin: '18px'}}>Cryptocurrency Prices by Market Cap</h4>
            <input placeholder='Search Crypto Currency' style={{ marginBottom: 20, width: '100%' }} onChange={e => setSearch(e.target.value)}/>
            <Container>
                {loading ? (
                    <Spinner animation='border' />
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => (
                                    <th
                                        style={{fontWeight: '700'}}
                                        align={head === 'Coin' ? '' : 'right'}
                                        key={head}
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{handleSearch().slice((page-1) * 10, (page - 1) * 10 + 10).map(row => {
                            const profit = row.price_change_percentage_24h > 0
                            return (
                                <tr
                                    onClick={()=> navigate(`/coins/${row.id}`)}
                                    key={row.id}
                                    className='coin-row'
                                >
                                    <td style={{ display: 'flex', gap: 15 }}>
                                        <img
                                            src={row?.image}
                                            alt={row.name}
                                            height='50'
                                            style={{ marginBottom: 10 }}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ textTransform: 'uppercase', fontSize: 22 }}>{row.symbol}</span>
                                            <span style={{ color: 'darkgrey' }}>{row.name}</span>
                                        </div>
                                    </td>
                                    <td align='right'>
                                        ${numberWithCommas(row.current_price.toFixed(2))}
                                    </td>
                                    <td
                                        align='right'
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500
                                        }}
                                    >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}
                                    </td>
                                    <td align='right'>
                                        ${numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                    </td>
                                </tr>
                            )
                        })}</tbody>
                    </Table>
                )}
            </Container>
            <Pagination
                style={{
                    padding: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                count={(handleSearch().length/10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value)
                    window.scroll(0, 160)
                }}
            />
        </Container>)
  )
}

export default CoinTable