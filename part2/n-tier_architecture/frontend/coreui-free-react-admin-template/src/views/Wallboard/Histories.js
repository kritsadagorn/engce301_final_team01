import { Component } from 'react'
import { Container } from './style.js'
import { Row, Col } from 'react-bootstrap'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Parse from '../../parse-init.js'

export default class Histories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoginHistoriesData: [],
      userLoginHistoriesPage: 0,
      userLoginHistoriesTotal: 0,
      agentStatusHistoriesData: [],
      agentStatusHistoriesPage: 0,
      agentStatusHistoriesTotal: 0,
      agentMessageHistoriesData: [],
      agentMessageHistoriesPage: 0,
      agentMessageHistoriesTotal: 0,
    }
  }

  async initUserLoginHistories() {
    let histories = Parse.Object.extend('UserLoginHistories')
    let queryHistories = new Parse.Query(histories)
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => console.log('UserLoginHistories subscription opened'))
    historiesListener.on('create', async (object) => {
      console.log('UserLoginHistories has been created', object)
      if (this.state.userLoginHistoriesData.length >= 10) {
        this.state.userLoginHistoriesData.pop()
      }
      this.setState({
        userLoginHistoriesData: [object, ...this.state.userLoginHistoriesData],
      })
    })

    const result = await Parse.Cloud.run('getUserLoginHistories', { page: 0, size: 10 })
    this.setState({
      userLoginHistoriesData: result.data || [],
      userLoginHistoriesPage: result.pagination.pagination || 0,
      userLoginHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentStatusHistories() {
    let histories = Parse.Object.extend('AgentStatusHistories')
    let queryHistories = new Parse.Query(histories)
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => console.log('AgentStatusHistories subscription opened'))
    historiesListener.on('create', async (object) => {
      console.log('AgentStatusHistories has been created', object)
      if (this.state.agentStatusHistoriesData.length >= 10) {
        this.state.agentStatusHistoriesData.pop()
      }
      this.setState({
        agentStatusHistoriesData: [object, ...this.state.agentStatusHistoriesData],
      })
    })

    const result = await Parse.Cloud.run('getAgentStatusHistories', { page: 0, size: 10 })
    this.setState({
      agentStatusHistoriesData: result.data || [],
      agentStatusHistoriesPage: result.pagination.pagination || 0,
      agentStatusHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentMessageHistories() {
    let histories = Parse.Object.extend('AgentMessageHistories')
    let queryHistories = new Parse.Query(histories)
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => console.log('AgentMessageHistories subscription opened'))
    historiesListener.on('create', async (object) => {
      console.log('AgentMessageHistories has been created', object)
      if (this.state.agentMessageHistoriesData.length >= 10) {
        this.state.agentMessageHistoriesData.pop()
      }
      this.setState({
        agentMessageHistoriesData: [object, ...this.state.agentMessageHistoriesData],
      })
    })

    const result = await Parse.Cloud.run('getAgentMessageHistories', { page: 0, size: 10 })
    this.setState({
      agentMessageHistoriesData: result.data || [],
      agentMessageHistoriesPage: result.pagination.pagination || 0,
      agentMessageHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  transfromStateToText(status) {
    return {
      1: 'Available',
      2: 'Active',
      3: 'Wrap',
      4: 'Not Ready',
    }[status] || 'Unknown'
  }

  transfromStateToTextColor(status) {
    return {
      1: '#2ecc71', // เขียว
      2: '#3498db', // น้ำเงิน
      3: '#f1c40f', // เหลือง
      4: '#e74c3c', // แดง
    }[status] || '#ffffff'
  }

  componentDidMount() {
    this.initUserLoginHistories()
    this.initAgentStatusHistories()
    this.initAgentMessageHistories()
  }

  render() {
    const tableStyle = {
      backgroundColor: '#2a303c', // เทาเข้ม
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    }

    const headerStyle = {
      backgroundColor: '#252a34', // เทาเข้มกว่าตัวตาราง
      color: '#e0e0e0', // เทาอ่อน
      fontSize: '1.1rem',
    }

    const cellStyle = {
      color: '#ffffff', // ขาว
      borderColor: '#ffffff1a', // เส้นขอบโปร่งแสง
    }

    return (
      <Container style={{ backgroundColor: '#1d222b', padding: '20px' }} className="mt-3">
        <Row className="mb-3">
          <Col md={12} style={{ padding: '1rem' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>Agent Send Message</h4>
            <CTable style={tableStyle}>
              <CTableHead>
                <CTableRow style={headerStyle}>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code (From)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code (To)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.agentMessageHistoriesData.map((i, key) => (
                  <CTableRow key={key} style={cellStyle}>
                    <CTableHeaderCell scope="row">
                      {i.get('createdAt').toLocaleString()}
                    </CTableHeaderCell>
                    <CTableDataCell>{i.get('from_agent_code')}</CTableDataCell>
                    <CTableDataCell>{i.get('to_agent_code')}</CTableDataCell>
                    <CTableDataCell>{i.get('message')}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12} style={{ padding: '1rem' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>Agent Login</h4>
            <CTable style={tableStyle}>
              <CTableHead>
                <CTableRow style={headerStyle}>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.userLoginHistoriesData.map((i, key) => (
                  <CTableRow key={key} style={cellStyle}>
                    <CTableHeaderCell scope="row">
                      {i.get('createdAt').toLocaleString()}
                    </CTableHeaderCell>
                    <CTableDataCell>
                      [{i.get('agent_code')}] {i.get('agent_name')}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{
                        backgroundColor: i.get('is_login') === '1' ? '#2ecc71' : '#e74c3c',
                        color: '#ffffff',
                      }}
                    >
                      {i.get('is_login') === '1' ? 'Login' : 'Logout'}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ padding: '1rem' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>Agent Status</h4>
            <CTable style={tableStyle}>
              <CTableHead>
                <CTableRow style={headerStyle}>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status From</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status To</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.agentStatusHistoriesData.map((i, key) => (
                  <CTableRow key={key} style={cellStyle}>
                    <CTableHeaderCell scope="row">
                      {i.get('createdAt').toLocaleString()}
                    </CTableHeaderCell>
                    <CTableDataCell>{`[${i.get('agent_code')}] ${i.get('agent_name')}`}</CTableDataCell>
                    <CTableDataCell
                      style={{ backgroundColor: this.transfromStateToTextColor(i.get('status_from')) }}
                    >
                      {this.transfromStateToText(i.get('status_from'))}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ backgroundColor: this.transfromStateToTextColor(i.get('status_to')) }}
                    >
                      {this.transfromStateToText(i.get('status_to'))}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </Col>
        </Row>
      </Container>
    )
  }
}