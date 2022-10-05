import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Container, Spinner } from 'react-bootstrap'
import { HistoricChart } from '../config/api'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function CoinChart({ coin, days }) {

    const [historicData, setHistoricData] = useState()
    const [loading, setloading] = useState(true)

    useEffect(() => {
        setloading(true)
        const fetchHistoricData = async () => {
            try {
                const data = await fetch(HistoricChart(coin.id, days)).then(res => res.json())
                setHistoricData(data.prices)
                setloading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchHistoricData()
  
    }, [coin, days])
  return (
    <Container>
        {loading ? (
            <div style={{ justifyContent: 'center'}}>
                <Spinner style={{margin: 'auto'}} animation='border' />
            </div>
        ) : (
            <>
        <Line
            data={{
                labels: historicData.map(coin => {
                    let date = new Date(coin[0])
                    let time = date.getHours() > 12
                        ? `${date.getHours() -12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`
                    return days === 1 ? time : date.toLocaleDateString()
                }),
                datasets: [
                    {
                        label: `Price ( Past ${days} day${days > 1 ? 's' : ''} ) in USD`,
                        data: historicData.map(coin => coin[1]),
                        borderColor: (historicData[historicData.length - 1 ][1] - historicData[0][1]) >= 0 ? "rgb(14, 203, 129)" : 'red',
                        fill: false,
                        backgroundColor: (historicData[historicData.length - 1 ][1] - historicData[0][1]) >= 0 ? "rgb(14, 203, 129)" : 'red',
                    },
                ],

            }}
            options={{
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }}
        />
        </>)}
    </Container>
  )
}

export default CoinChart