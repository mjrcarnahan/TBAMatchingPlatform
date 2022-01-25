import React from 'react'
import './index.css'

const Step = () => (
  <div className='row'>
    <div className='col-6 start-4 step mt-30'>
      <div className='step-line'></div>
      <div className='step-items'>
        <div className='step-item next-item'></div>
        <div className='step-item next-item'></div>
        <div className='step-item active'></div>
        <div className='step-item'></div>
      </div>
    </div>
  </div>
)

export default Step
