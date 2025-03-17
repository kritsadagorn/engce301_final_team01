/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
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
      // User login
      userLoginHistoriesData: [],
      userLoginHistoriesPage: 0,
      userLoginHistoriesTotal: 0,
      // Agent status
      agentStatusHistoriesData: [],
      agentStatusHistoriesPage: 0,
      agentStatusHistoriesTotal: 0,
      // Agent message
      agentMessageHistoriesData: [],
      agentMessageHistoriesPage: 0,
      agentMessageHistoriesTotal: 0,
    }
  }

  async initUserLoginHistories() {
    let histories = Parse.Object.extend('UserLoginHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('UserLoginHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('UserLoginHistories has been created', object)
      if (this.state.userLoginHistoriesData.length >= 10) {
        this.state.userLoginHistoriesData.pop()
      }

      this.setState({
        userLoginHistoriesData: [object, ...this.state.userLoginHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getUserLoginHistories', {
      page: 0,
      size: 10,
    })
    this.setState({
      userLoginHistoriesData: result.data || [],
      userLoginHistoriesPage: result.pagination.pagination || 0,
      userLoginHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentStatusHistories() {
    let histories = Parse.Object.extend('AgentStatusHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('AgentStatusHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('AgentStatusHistories has been created', object)
      if (this.state.agentStatusHistoriesData.length >= 10) {
        this.state.agentStatusHistoriesData.pop()
      }

      this.setState({
        agentStatusHistoriesData: [object, ...this.state.agentStatusHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getAgentStatusHistories', {
      page: 0,
      size: 10,
    })
    this.setState({
      agentStatusHistoriesData: result.data || [],
      agentStatusHistoriesPage: result.pagination.pagination || 0,
      agentStatusHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentMessageHistories() {
    let histories = Parse.Object.extend('AgentMessageHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('AgentMessageHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('AgentMessageHistories has been created', object)
      if (this.state.agentMessageHistoriesData.length >= 10) {
        this.state.agentMessageHistoriesData.pop()
      }

      this.setState({
        agentMessageHistoriesData: [object, ...this.state.agentMessageHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getAgentMessageHistories', {
      page: 0,
      size: 10,
    })
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
      4: 'Not Ready ',
    }[status]
  }

  transfromStateToTextColor(status) {
    return {
      1: 'bg-success text-white',
      2: 'bg-info',
      3: 'bg-warning',
      4: 'bg-danger text-white',
    }[status]
  }

  componentDidMount() {
    this.initUserLoginHistories()
    this.initAgentStatusHistories()
    this.initAgentMessageHistories()
  }

  render() {
    return (
      <Container className="mt-3">
        <Row className="mb-3">
          <Col md={12} style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <h4>Agent send message</h4>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code (From)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code (To)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.agentMessageHistoriesData.map((i, key) => (
                  <CTableRow key={key}>
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
          <Col md={12} style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <h4>Agent login </h4>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.userLoginHistoriesData.map((i, key) => (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">
                      {i.get('createdAt').toLocaleString()}
                    </CTableHeaderCell>
                    <CTableDataCell>
                      [{i.get('agent_code')}] {i.get('agent_name')}
                    </CTableDataCell>
                    <CTableDataCell
                      className={`${i.get('is_login') === '1' ? 'bg-success' : 'bg-danger'} text-white`}
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
          <Col md={12} style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <h4>Agent status </h4>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agent Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status from</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status to</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.agentStatusHistoriesData.map((i, key) => (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">
                      {i.get('createdAt').toLocaleString()}
                    </CTableHeaderCell>
                    <CTableDataCell>{`[${i.get('agent_code')}] ${i.get('agent_name')}`}</CTableDataCell>
                    <CTableDataCell
                      className={`${this.transfromStateToTextColor(i.get('status_from'))}`}
                    >
                      <div>{this.transfromStateToText(i.get('status_from'))}</div>
                    </CTableDataCell>
                    <CTableDataCell
                      className={`${this.transfromStateToTextColor(i.get('status_to'))}`}
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