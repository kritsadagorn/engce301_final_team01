import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'

const agentStatus = {
  4: { status: 'Lunch', min: 60 },
  5: { status: 'Toilet', min: 30 },
  6: { status: 'Training', min: 60 },
  7: { status: 'Meeting', min: 60 },
  8: { status: 'Special Assigned', min: 30 },
  9: { status: 'System Down', min: false },
  10: { status: 'Coaching', min: false },
  11: { status: 'Sick', min: false },
  12: { status: 'Outbound Call', min: false },
  13: { status: 'Event', min: false },
  14: { status: 'Morning Break', min: false },
  15: { status: 'Afternoon Break', min: false },
}

export const msToTimeFor4 = (time, limit, agent, style, id, AgentStatusCode) => {
  console.log('msToTimeFor4[AgentStatusCode]: ', AgentStatusCode)

  const s = Date.now({ timeZone: 'Asia/Jakarta' }) - time
  let styleFont = 'text-light' // เปลี่ยนจาก text-secondary เป็น text-light เพื่อให้เข้ากับพื้นหลังเข้ม
  let styleFontAgent = 'text-light d-inline-block text-truncate'
  
  function pad(n, z = 2) {
    return ('00' + n).slice(-z)
  }

  if (limit !== 'false') {
    if (parseInt(s) >= parseInt(limit) * 60000) {
      styleFont = style || 'text-warning' // Default เป็น warning ถ้าเกินเวลา
      styleFontAgent = `${style || 'text-warning'} d-inline-block text-truncate`
    }
  }

  const ms = s % 1000
  let secs = Math.floor((s - ms) / 1000)
  let mins = Math.floor(secs / 60)
  secs = secs % 60
  let hrs = Math.floor(mins / 60)
  mins = mins % 60

  const status = AgentStatusCode ? agentStatus[AgentStatusCode] : false
  let color = '#e0e0e0' // สีเทาอ่อนเป็น default
  if (status && status.min) {
    const min = status.min
    if (hrs > 1 || mins > min) {
      color = '#e74c3c' // แดงเมื่อเกินเวลา
    }
  }

  return (
    <tr key={id} style={{ backgroundColor: '#2a303c', borderBottom: '1px solid #ffffff1a' }}>
      <td key={'F' + id}>
        <small className={styleFontAgent} style={{ maxWidth: '200px' }}>
          <div style={{ color, padding: '5px 0 5px 5px', fontSize: '14px' }}>
            <BsFillPersonFill style={{ marginRight: '5px' }} /> {agent} {status ? `(${status.status})` : ''}
          </div>
        </small>
      </td>
      <td className="text-right" key={'S' + id}>
        <small>
          <span className={styleFont}>
            <div style={{ color, padding: '5px 5px 5px 0', fontSize: '14px' }}>
              {pad(hrs)}:{pad(mins)}:{pad(secs)}
            </div>
          </span>
        </small>
      </td>
    </tr>
  )
}

export const msToTime = (time, limit, agent, style, id) => {
  const s = Date.now({ timeZone: 'Asia/Jakarta' }) - time
  let styleFont = 'text-light' // เปลี่ยนจาก text-secondary
  let styleFontAgent = 'text-light d-inline-block text-truncate'
  
  function pad(n, z = 2) {
    return ('00' + n).slice(-z)
  }

  if (limit !== 'false') {
    if (parseInt(s) >= parseInt(limit) * 60000) {
      styleFont = style || 'text-warning'
      styleFontAgent = `${style || 'text-warning'} d-inline-block text-truncate`
    }
  }

  const ms = s % 1000
  let secs = Math.floor((s - ms) / 1000)
  let mins = Math.floor(secs / 60)
  secs = secs % 60
  let hrs = Math.floor(mins / 60)
  mins = mins % 60

  return (
    <tr key={id} style={{ backgroundColor: '#2a303c', borderBottom: '1px solid #ffffff1a' }}>
      <td key={'F' + id}>
        <small className={styleFontAgent} style={{ maxWidth: '200px' }}>
          <div style={{ color: '#000', padding: '5px 0 5px 5px', fontSize: '14px' }}>
            <BsFillPersonFill style={{ marginRight: '5px' }} /> {agent}
          </div>
        </small>
      </td>
      <td className="text-right" key={'S' + id}>
        <small>
          <span className={styleFont}>
            <div style={{ color: '#000', padding: '5px 5px 5px 0', fontSize: '14px' }}>
              {pad(hrs)}:{pad(mins)}:{pad(secs)}
            </div>
          </span>
        </small>
      </td>
    </tr>
  )
}