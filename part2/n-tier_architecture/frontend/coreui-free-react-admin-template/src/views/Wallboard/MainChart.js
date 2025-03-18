import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = '#ffffff33' // เทาอ่อนโปร่งแสง
          chartRef.current.options.scales.x.grid.color = '#ffffff33'
          chartRef.current.options.scales.x.ticks.color = '#e0e0e0' // เทาอ่อน
          chartRef.current.options.scales.y.grid.borderColor = '#ffffff33'
          chartRef.current.options.scales.y.grid.color = '#ffffff33'
          chartRef.current.options.scales.y.ticks.color = '#e0e0e0'
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)

  return (
    <div style={{ backgroundColor: '#1d222b', padding: '20px' }}>
      <CChartLine
        ref={chartRef}
        style={{ 
          height: '300px', 
          marginTop: '40px', 
          backgroundColor: '#2a303c', // เทาเข้มกว่าพื้นหลัง
          borderRadius: '10px',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
        }}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(52, 152, 219, 0.2)', // น้ำเงินอ่อนโปร่งแสง
              borderColor: '#3498db', // น้ำเงิน
              pointHoverBackgroundColor: '#3498db',
              borderWidth: 2,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
              fill: true,
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: '#2ecc71', // เขียว
              pointHoverBackgroundColor: '#2ecc71',
              borderWidth: 2,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
            },
            {
              label: 'My Third dataset',
              backgroundColor: 'transparent',
              borderColor: '#e74c3c', // แดง
              pointHoverBackgroundColor: '#e74c3c',
              borderWidth: 1,
              borderDash: [8, 5],
              data: [65, 65, 65, 65, 65, 65, 65],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true, // เปิด legend เพื่อให้เห็นชื่อ dataset
              labels: {
                color: '#e0e0e0' // สีเทาอ่อนสำหรับ legend
              }
            },
          },
          scales: {
            x: {
              grid: {
                color: '#ffffff33', // เส้น grid โปร่งแสง
                drawOnChartArea: false,
              },
              ticks: {
                color: '#e0e0e0', // สีเทาอ่อน
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: '#ffffff33',
              },
              grid: {
                color: '#ffffff33',
              },
              max: 250,
              ticks: {
                color: '#e0e0e0',
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </div>
  )
}

export default MainChart