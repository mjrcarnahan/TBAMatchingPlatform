import React, { useContext, useEffect, useState } from 'react'
import './index.css'

import { AuthContext } from '../../context'

const ProgressBar = ({ className = '' }) => {
  const { state, dispatch } = useContext(AuthContext)

  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    if (state.step) setPercentage((state.step.current * 100) / state.step.total)
  }, [state.step])
  return (
    <div className={`${className} ProgressBar`}>
      <div className='ProgressBar-active' style={{ width: `${percentage}%` }}>
        {percentage.toFixed(0)}%
      </div>
    </div>
  )
}

export default ProgressBar
