import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = ({ history }) => (
  <div className='container home'>
    <Link to='/' className='logo'>
      <img src='/images/logo.svg' alt='' />
    </Link>
    <div className='circle'>
      <div className='circle-container'>
        <div className='circle-1'></div>
        <div className='circle-2'></div>
      </div>
    </div>
    <div className='home-left'>
      <img src='/images/logoWhite.png' alt='' />
    </div>
    <div className='home-right'>
      <div className='text-center'>
        <h2 className='title-3'>Page not found</h2>
        <button
          type='button'
          onClick={() => {
            history.goBack()
          }}
          className='btn-link mt-20'
        >
          Back
        </button>
      </div>
    </div>
  </div>
)

export default Error404
