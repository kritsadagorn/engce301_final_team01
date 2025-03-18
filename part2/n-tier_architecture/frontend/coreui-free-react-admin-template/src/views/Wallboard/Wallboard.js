import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container } from './style'
import Agentonline from './Agentonline'
import WallboardHeader from './WallboardHeader'
import CallStatus from './CallStatus'
import CenterBar from './CenterBar'
import ReactAudioPlayer from 'react-audio-player'

import Parse from '../../parse-init.js'

import Histories from './Histories.js'

export default class Wallboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CallOffer: 0,
      CallAbandon: 0,
      AgentLogin: 0,
      CallQueue: 0,
      CallQueueList: [],
      OnlineAgentList: [],
      token: window.location.pathname,
      status: null,
      beep: '',
      checked: true,
      ServiceCode: 'ALL',
      CallAgentSummaries: [],
      WallboardBanner: [],
    }

    this.handleServiceCodeChange = this.handleServiceCodeChange.bind(this)
  }

  //--------------- Global Functions of OnlineAgentLists -------------

  getOnlineAgentList(AgentList) {
    const agent = AgentList.map((item) => ({
      AgentCode: item.get('AgentCode'),
      AgentName: item.get('AgentName') + '[' + item.get('Queue') + ']',
      AgentStatus: item.get('AgentStatus'),
      IsLogin: item.get('IsLogin'),
      Queue: item.get('Queue'),
      AgentStatusCode: item.get('AgentStatusCode'),
      AgentTime: Date.parse(item.get('startedAt')),
    }))

    this.setState({
      OnlineAgentList: agent,
    })
  }

  createOnlineAgentList(object) {
    let arr = this.state.OnlineAgentList

    if (parseInt(object.get('IsLogin')) === 1) {
      arr.push({
        AgentCode: object.get('AgentCode'),
        AgentName: object.get('AgentName') + '[' + object.get('Queue') + ']',
        AgentStatus: object.get('AgentStatus'),
        AgentStatusCode: object.get('AgentStatusCode'),
        AgentTime: Date.parse(object.get('startedAt')),
      })
    }

    this.setState({
      OnlineAgentList: arr,
    })
  }

  updateOnlineAgentList(object) {
    let arr = this.state.OnlineAgentList

    if (this.searchAgent(object.get('AgentCode')) === true) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].AgentCode === object.get('AgentCode')) {
          if (parseInt(object.get('IsLogin')) === 1) {
            ;(arr[i].AgentCode = object.get('AgentCode')),
              (arr[i].AgentName = object.get('AgentName') + '[' + object.get('Queue') + ']'),
              (arr[i].AgentStatus = object.get('AgentStatus')),
              (arr[i].AgentStatusCode = object.get('AgentStatusCode')),
              (arr[i].AgentTime = Date.parse(object.get('startedAt')))
          } else {
            arr.splice(i, 1)
          }
        }
      }
    } else {
      arr.push({
        AgentCode: object.get('AgentCode'),
        AgentName: object.get('AgentName') + '[' + object.get('Queue') + ']',
        AgentStatus: object.get('AgentStatus'),
        AgentStatusCode: object.get('AgentStatusCode'),
        AgentTime: Date.parse(object.get('startedAt')),
      })
    }

    this.setState({
      OnlineAgentList: arr,
    })
  }

  deleteOnlineAgentList(id) {
    let arr = this.state.OnlineAgentList

    if (this.searchAgent(id) === true) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].AgentCode === id) {
          arr.splice(i, 1)
        }
      }

      this.setState({
        OnlineAgentList: arr,
      })
    }
  }

  onlineTimeStyle(normal, warning, timeValue) {
    let time_normal = normal * 60000,
      time_warning = warning * 60000

    if (timeValue < time_normal) {
      return 'text-success'
    } else if (timeValue < time_warning) {
      return 'text-warning'
    } else {
      return 'text-danger'
    }
  }

  searchAgent(id) {
    let myArray = this.state.OnlineAgentList
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].AgentCode === id) {
        return true
      }
    }
    return false
  }

  //-----------------------------------------------

  async get_data() {
    let WallboardBanner = Parse.Object.extend('WallboardBanners')
    let WallboardBanners = new Parse.Query(WallboardBanner)

    let CallAgentSummaries = Parse.Object.extend('CallAgentSummaries')
    let queryCallAgentSummaries = new Parse.Query(CallAgentSummaries)

    let OnlineAgentLists = Parse.Object.extend('OnlineAgentLists')
    let queryOnlineAgentLists = new Parse.Query(OnlineAgentLists)

    //------------ Class: WallboardBanners ----------------

    const WallBoardText = await WallboardBanners.find()
    let wallboard = await WallboardBanners.subscribe()

    const banner = WallBoardText.map((item) => ({
      Queue: item.get('Queue'),
      BannerText: item.get('BannerText'),
    }))

    this.setState({ WallboardBanner: banner })

    wallboard.on('open', () => {
      console.log('subscription opened wallboard')
    })

    wallboard.on('create', async (object) => {
      console.log('object create wallboard')
      const newBanner = {
        BannerText: object.get('BannerText'),
        Queue: object.get('Queue'),
      }

      this.setState((prevState) => {
        const updatedState = [...prevState.WallboardBanner, newBanner]
        return { WallboardBanner: updatedState }
      })
    })

    wallboard.on('update', async (object) => {
      console.log('subscription Update wallboard')

      const updatedBanner = {
        BannerText: object.get('BannerText'),
        Queue: object.get('Queue'),
      }

      this.setState((prevState) => {
        const updatedIndex = prevState.WallboardBanner.findIndex(
          (item) => item.Queue === updatedBanner.Queue,
        )

        if (updatedIndex !== -1) {
          const updatedState = [...prevState.WallboardBanner]
          updatedState[updatedIndex] = updatedBanner
          return { WallboardBanner: updatedState }
        }
        return prevState
      })
    })

    wallboard.on('delete', async (object) => {
      const deletedQueue = object.get('Queue')

      this.setState((prevState) => {
        const updatedState = prevState.WallboardBanner.filter((item) => item.Queue !== deletedQueue)
        return { WallboardBanner: updatedState }
      })
    })

    //------------ Class: CallAgentSummaries ----------------

    // Call Agent Summaries
    const summaryGet = await queryCallAgentSummaries.find()

    if (summaryGet) {
      var CallAgentSummarie = {}

      summaryGet.map((item) => {
        const arr = {
          CallAbandon: parseInt(item.get('CallAbandon')),
          CallOffer: parseInt(item.get('CallOffer')),
        }
        CallAgentSummarie[item.get('Queue')] = arr
      })

      this.setState((prevState) => ({
        CallAgentSummaries: CallAgentSummarie,
      }))
    }

    let summary = await queryCallAgentSummaries.subscribe()

    summary.on('update', async (object) => {
      const arr = {
        CallAbandon: parseInt(object.get('CallAbandon')),
        CallOffer: parseInt(object.get('CallOffer')),
      }

      this.setState((prevState) => ({
        CallAgentSummaries: {
          ...prevState.CallAgentSummaries,
          [object.get('Queue')]: arr,
        },
      }))
    })

    //------------ Class: OnlineAgentLists ----------------

    const onlineAgentList = await queryOnlineAgentLists.find()
    this.getOnlineAgentList(onlineAgentList)
    let agent = await queryOnlineAgentLists.subscribe()

    agent.on('create', async (object) => {
      console.log('object Create agent list')
      this.createOnlineAgentList(object)
    })

    agent.on('update', async (object) => {
      console.log('object updated agent list')
      this.updateOnlineAgentList(object)
    })

    agent.on('delete', async (object) => {
      console.log('object delete agent list')
      this.deleteOnlineAgentList(object.get('AgentCode'))
    })
  } //-- End Function get_data()

  componentDidMount() {
    this.setState({
      status: true,
    })
    this.get_data()
    
    // Add dark theme styles
    document.body.style.backgroundColor = '#1d222b'
    document.body.style.color = '#e0e0e0'
    
    // Add custom styles for dark theme
    const style = document.createElement('style')
    style.textContent = `
      .card {
        background-color: #2d3748 !important;
        border-color: #4a5568 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        margin-bottom: 1rem !important;
      }
      
      .card-header {
        background-color: #2d3748 !important;
        border-bottom: 1px solid #4a5568 !important;
        padding: 0.75rem 1.25rem !important;
      }
      
      .card-body {
        padding: 1rem !important;
      }
      
      .table {
        color: #e0e0e0 !important;
      }
      
      .table thead th {
        border-bottom: 2px solid #4a5568 !important;
        background-color: #2d3748 !important;
        color: #90cdf4 !important;
      }
      
      .table td, .table th {
        border-top: 1px solid #4a5568 !important;
        padding: 0.75rem !important;
      }
      
      .badge {
        padding: 0.5em 0.75em !important;
        font-size: 0.85em !important;
        font-weight: 600 !important;
        border-radius: 0.25rem !important;
      }
      
      .badge-success {
        background-color: #38a169 !important;
      }
      
      .badge-warning {
        background-color: #d69e2e !important;
        color: #1a202c !important;
      }
      
      .badge-danger {
        background-color: #e53e3e !important;
      }
      
      .badge-info {
        background-color: #4299e1 !important;
      }
      
      .badge-primary {
        background-color: #4c51bf !important;
      }
      
      .badge-secondary {
        background-color: #718096 !important;
      }
      
      .btn {
        border-radius: 0.25rem !important;
        padding: 0.5rem 1rem !important;
        font-weight: 600 !important;
        transition: all 0.2s !important;
      }
      
      .btn-primary {
        background-color: #4c51bf !important;
        border-color: #4c51bf !important;
      }
      
      .btn-primary:hover {
        background-color: #434190 !important;
        border-color: #434190 !important;
      }
      
      .dropdown-menu {
        background-color: #2d3748 !important;
        border-color: #4a5568 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      }
      
      .dropdown-item {
        color: #e0e0e0 !important;
      }
      
      .dropdown-item:hover, .dropdown-item:focus {
        background-color: #4a5568 !important;
        color: #ffffff !important;
      }
      
      .text-dark {
        color: #e0e0e0 !important;
      }
      
      .alert {
        border-radius: 0.25rem !important;
        padding: 0.75rem 1.25rem !important;
        margin-bottom: 1rem !important;
      }
      
      .form-control {
        background-color: #2d3748 !important;
        border-color: #4a5568 !important;
        color: #e0e0e0 !important;
      }
      
      .form-control:focus {
        border-color: #4c51bf !important;
        box-shadow: 0 0 0 0.2rem rgba(76, 81, 191, 0.25) !important;
      }
      
      .form-control::placeholder {
        color: #a0aec0 !important;
      }
    `
    document.head.appendChild(style)
  }
  
  componentWillUnmount() {
    // Remove custom styles when component unmounts
    document.body.style.backgroundColor = ''
    document.body.style.color = ''
  }

  handleServiceCodeChange(newServiceCode) {
    this.setState({ ServiceCode: newServiceCode })
  }

  render() {
    return (
      <div className="App">
        <Container className="mt-3">
          <WallboardHeader
            title={'AGENT STATUS'}
            serviceChange={this.handleServiceCodeChange}
            ServiceCode={this.state.ServiceCode}
          />
          <CallStatus
            ServiceCode={this.state.ServiceCode}
            CallAgentSummaries={this.state.CallAgentSummaries}
            OnlineAgentList={this.state.OnlineAgentList}
            CallQueueList={this.state.CallQueueList}
          />
          <CenterBar
            ServiceCode={this.state.ServiceCode}
            WallBoardText={this.state.WallboardBanner}
          />
        </Container>
        <Agentonline
          OnlineAgentList={this.state.OnlineAgentList}
          ServiceCode={this.state.ServiceCode}
        />
        <Histories />
        <Container className="text-center">
          <ReactAudioPlayer
            src={this.state.beep}
            autoPlay
            muted={!this.state.checked}
            loop={true}
            controls={false}
            download={false}
          />
        </Container>
      </div>
    )
  }
}