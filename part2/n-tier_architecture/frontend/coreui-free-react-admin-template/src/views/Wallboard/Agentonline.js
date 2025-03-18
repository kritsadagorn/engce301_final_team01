import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'
import { Container } from './style'
import { msToTime, msToTimeFor4 } from './NotReadyAgent'

const Agentonline = ({ OnlineAgentList, ServiceCode }) => {
  const statusStyles = {
    available: { bg: '#2ecc71', text: '#ffffff' }, // เขียวสดใส
    active: { bg: '#3498db', text: '#ffffff' },    // น้ำเงิน
    wrap: { bg: '#f1c40f', text: '#1d222b' },     // เหลือง
    notReady: { bg: '#e74c3c', text: '#ffffff' }  // แดง
  }

  const tableStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#2a303c', // เทาเข้มอ่อนกว่าพื้นหลัง
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  }

  const renderAgentTable = (title, statusCode, style) => (
    <Col md={3}>
      <table className="table table-sm border-0 shadow-sm mb-4" style={tableStyle}>
        <thead>
          <tr>
            <th 
              colSpan="2" 
              className="text-center py-3"
              style={{ 
                backgroundColor: style.bg, 
                color: style.text,
                fontSize: '1.25rem', 
                fontWeight: '600' 
              }}
            >
              {title}
            </th>
          </tr>
        </thead>
        <tbody style={{ color: '#e0e0e0' }}> {/* สีเทาอ่อนสำหรับข้อความ */}
          {ServiceCode === 'ALL'
            ? Object.keys(OnlineAgentList).map((key) => {
                const agent = OnlineAgentList[key]
                if (parseInt(agent.AgentStatus) === statusCode) {
                  return statusCode === 4 
                    ? msToTimeFor4(agent.AgentTime, 'false', agent.AgentName, '', agent.AgentCode, parseInt(agent.AgentStatusCode))
                    : msToTime(agent.AgentTime, 'false', agent.AgentName, '', agent.AgentCode)
                }
                return null
              })
            : Object.keys(OnlineAgentList).map((key) => {
                const agent = OnlineAgentList[key]
                if (parseInt(agent.AgentStatus) === statusCode && agent.Queue === ServiceCode) {
                  return statusCode === 4 
                    ? msToTimeFor4(agent.AgentTime, 'false', agent.AgentName, '', agent.AgentCode, agent.AgentStatusCode)
                    : msToTime(agent.AgentTime, 'false', agent.AgentName, '', agent.AgentCode)
                }
                return null
              })}
        </tbody>
      </table>
    </Col>
  )

  return (
    <div style={{ backgroundColor: '#1d222b', padding: '20px' }}>
      <Container className="mt-4">
        <Row className="g-4">
          {renderAgentTable('Available Agent', 1, statusStyles.available)}
          {renderAgentTable('Active Agent', 2, statusStyles.active)}
          {renderAgentTable('Wrap Agent', 3, statusStyles.wrap)}
          {renderAgentTable('Not Ready Agent', 4, statusStyles.notReady)}
        </Row>
      </Container>
    </div>
  )
}

export default Agentonline