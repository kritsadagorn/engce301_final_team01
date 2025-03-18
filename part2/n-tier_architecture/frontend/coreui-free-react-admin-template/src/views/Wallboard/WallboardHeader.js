import React from 'react'
import { Header } from './style'
import { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import DateTime from './dateTime'

import wallboard_logo from './../../assets/images/react.jpg'

// สร้างธีมที่เข้ากับพื้นหลังสีเข้ม
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      paper: '#2d3748',
      default: '#1d222b',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0aec0',
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#2d3748',
          color: '#e0e0e0',
        },
        icon: {
          color: '#90caf9',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#4a5568',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#4c51bf',
          },
          '&:hover': {
            backgroundColor: '#4a5568',
          },
        },
      },
    },
  },
})

const WallboardHeader = ({ title, serviceChange, ServiceCode }) => {
  const [age, setAge] = React.useState('10')

  const serviceCode = [
    'ALL',
    'Team1',
    'Team2',
    'Team3',
    'Team4',
    'Team5',
    'Team6',
    'Team7',
    'Team8',
    'Team9',
  ]

  const handleChange = (event) => {
    setAge(event.target.value)
    serviceChange(event.target.value)
  }

  // สไตล์สำหรับส่วนหัวที่แก้ไขแล้ว
  const headerStyles = {
    wallboard_title: {
      color: '#90caf9',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    },
    queue_title: {
      color: '#e0e0e0',
      fontSize: '1rem',
      marginBottom: '8px',
      fontWeight: '500',
    }
  }

  return (
    <Header>
      <div className="wallboard_logo">
        <img src={wallboard_logo} alt="Wallboard Logo" />
      </div>
      <div className="wallboard_title" style={headerStyles.wallboard_title}>{title}</div>
      <div className="datetimes">
        <DateTime />
      </div>
      <div className="wallboard_queue">
        <div className="queue_title" style={headerStyles.queue_title}>Call Queue</div>
        <div>
          <ThemeProvider theme={darkTheme}>
            <FormControl sx={{ width: '150px' }}>
              <Select 
                value={ServiceCode} 
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#2d3748',
                      color: '#e0e0e0',
                    }
                  }
                }}
              >
                {serviceCode.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    </Header>
  )
}

export default WallboardHeader