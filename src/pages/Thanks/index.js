import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { AuthContext } from '../../context'
import { Router } from '../../router'
const Complete = () => {
  const { state } = useContext(AuthContext)
  return (
    <>
      <Header />
      <div className='row mh-100'>
        <div className='col-6 start-4 text-center row gap-30'>
          <h2 className='col-12 title-3 bold'>Thanks for registering</h2>
        </div>
      </div>
    </>
  )
}

export default Complete
