import React from 'react'
import { CenterBarStyle } from './style'
import DateTime from './dateTime'
import Marquee from 'react-fast-marquee'

const CenterBar = ({ ServiceCode, WallBoardText }) => {
  const filteredItems = WallBoardText.filter((item) => item.Queue === ServiceCode)

  const barStyle = {
    background: 'linear-gradient(135deg, #2a303c, #252a34)', // กลมกลืนกับ #1d222b
    borderRadius: '10px',
    padding: '10px 20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '60px'
  }

  const marqueeStyle = {
    color: '#ffffff', // ขาวเพื่อ contrast
    fontSize: '1.25rem',
    fontWeight: '500'
  }

  return (
    <CenterBarStyle style={{ backgroundColor: '#1d222b', padding: '20px' }}>
      <div style={barStyle}>
        <div className="left" style={{ flex: 1 }}>
          <div className="TextSlide">
            <Marquee style={marqueeStyle}>
              {filteredItems.length > 0 ? filteredItems[0].BannerText : 'No message available'}
            </Marquee>
          </div>
        </div>
        <div className="right">
          <DateTime />
        </div>
      </div>
    </CenterBarStyle>
  )
}

export default CenterBar