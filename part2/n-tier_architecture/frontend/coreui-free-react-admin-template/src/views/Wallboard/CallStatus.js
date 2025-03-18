import React from 'react'
import { CallStatusContainer } from './style'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback'
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'

const CallStatus = ({ OnlineAgentList, CallAgentSummaries, ServiceCode, CallQueueList }) => {
  let callOffer = 0
  let CallAbandon = 0

  Object.keys(CallAgentSummaries).map((queueName) => {
    const item = CallAgentSummaries[queueName]
    if (ServiceCode === 'ALL') {
      callOffer += parseInt(item.CallOffer)
      CallAbandon += parseInt(item.CallAbandon)
    } else if (ServiceCode === queueName) {
      callOffer += parseInt(item.CallOffer)
      CallAbandon += parseInt(item.CallAbandon)
    }
  })

  let Counter = ServiceCode === 'ALL' 
    ? OnlineAgentList.length 
    : OnlineAgentList.filter(item => item.Queue === ServiceCode).length

  let QueueCounter = 0
  CallQueueList.map((item) => {
    if (ServiceCode === 'ALL' || item.Queue === ServiceCode) {
      QueueCounter += parseInt(item.ConcurrentCall)
    }
  })

  const cardStyle = {
    background: 'linear-gradient(135deg, #2a303c, #252a34)', // เทาเข้มกลมกลืนกับพื้นหลัง
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': { transform: 'translateY(-5px)' }
  }

  const iconStyle = {
    fontSize: '2rem',
    marginRight: '10px'
  }

  const statStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff' // ขาวเพื่อ contrast กับพื้นหลัง
  }

  return (
    <CallStatusContainer style={{ backgroundColor: '#1d222b', padding: '20px' }} className="py-4">
      <div className="d-flex justify-content-between flex-wrap gap-4">
        <div className="group" style={cardStyle}>
          <div className="label fw-bold mb-2" style={{ color: '#bdc3c7' }}>Offer Call</div>
          <div className="counter d-flex align-items-center">
            <PhoneCallbackIcon style={{ ...iconStyle, color: '#2ecc71' }} />
            <div style={statStyle}>{callOffer}</div>
          </div>
        </div>
        <div className="group" style={cardStyle}>
          <div className="label fw-bold mb-2" style={{ color: '#bdc3c7' }}>Abandon Call</div>
          <div className="counter d-flex align-items-center">
            <PhoneMissedIcon style={{ ...iconStyle, color: '#e74c3c' }} />
            <div style={statStyle}>{CallAbandon}</div>
          </div>
        </div>
        <div className="group" style={cardStyle}>
          <div className="label fw-bold mb-2" style={{ color: '#bdc3c7' }}>Agents</div>
          <div className="counter d-flex align-items-center">
            <RecordVoiceOverIcon style={{ ...iconStyle, color: '#3498db' }} />
            <div style={statStyle}>{Counter}</div>
          </div>
        </div>
        <div className="group" style={cardStyle}>
          <div className="label fw-bold mb-2" style={{ color: '#bdc3c7' }}>Total Queue</div>
          <div className="counter d-flex align-items-center">
            <div style={{ ...iconStyle, color: '#9b59b6' }}></div>
            <div style={statStyle}>{QueueCounter}</div>
          </div>
        </div>
      </div>
    </CallStatusContainer>
  )
}

export default CallStatus