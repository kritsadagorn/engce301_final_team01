import React, { useState, useEffect } from 'react'

export const DateTime = () => {
  const locale = 'en'
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every 1 second

    return () => clearInterval(intervalId)
  }, [])

  const formatDate = (date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${hours}:${minutes}      ${day}/${month}/${year}`
  }

  const dateTimeStyle = {
    color: '#3498db', // น้ำเงินสดใสเพื่อเด่นจากพื้นหลัง
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'right',
    padding: '0 10px'
  }

  return <div style={dateTimeStyle}>{formatDate(currentTime)}</div>
}

export default DateTime