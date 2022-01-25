import React from 'react'
import Header from '../Header'
import './index.css'

const Loading = () => {
  return (
    <div className='container'>
      <Header />
      <div className='mh-100  flex a-center j-center'>
        <div className='loading'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
