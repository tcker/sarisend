import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
import { Line } from 'react-chartjs-2'
import apt from '../assets/Aptos.png'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function TokenInfo() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [chartData, setChartData] = useState(null)

  const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'All']

  // Generate random chart data
  const generateRandomData = (points) => {
    const data = []
    let baseValue = 120 + Math.random() * 20 // Start around $120-140
    
    for (let i = 0; i < points; i++) {
      // Add some volatility
      const change = (Math.random() - 0.5) * 10
      baseValue = Math.max(80, Math.min(200, baseValue + change))
      data.push(baseValue)
    }
    return data
  }

  const generateLabels = (timeframe, points) => {
    const labels = []
    for (let i = 0; i < points; i++) {
      labels.push('')
    }
    return labels
  }

  useEffect(() => {
    const points = selectedTimeframe === '1H' ? 60 : 
                  selectedTimeframe === '1D' ? 24 : 
                  selectedTimeframe === '1W' ? 7 : 
                  selectedTimeframe === '1M' ? 30 : 
                  selectedTimeframe === '1Y' ? 12 : 100

    const randomData = generateRandomData(points)
    const labels = generateLabels(selectedTimeframe, points)

    setChartData({
      labels,
      datasets: [
        {
          label: 'Price',
          data: randomData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
      ],
    })
  }, [selectedTimeframe])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  }

  const currentPrice = chartData?.datasets[0]?.data[chartData.datasets[0].data.length - 1] || 123
  const minPrice = chartData?.datasets[0]?.data ? Math.min(...chartData.datasets[0].data) : 88.21
  const maxPrice = chartData?.datasets[0]?.data ? Math.max(...chartData.datasets[0].data) : 137.86

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">

        <button 
        className="p-2 bg-white text-black rounded-full hover:bg-gray-700 transition-colors"
        onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Token Info */}
      <div className="flex items-center space-x-3 mb-8">
        <img src={apt} alt="Aptos" className="w-12 h-12 rounded-full" />
        <div>
          <h1 className="text-xl font-semibold">Aptos / APT</h1>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-light">${currentPrice.toFixed(0)}</span>
            <span className="text-green-500 text-sm font-medium">+2.18%</span>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-3">Time</p>
        <div className="flex justify-center space-x-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        {chartData && (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Price Range */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>MIN ${minPrice.toFixed(2)}</span>
        <span>MAX ${maxPrice.toFixed(2)}</span>
      </div>
    </div>
  )
}
