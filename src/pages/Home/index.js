import React from 'react'
import { Link } from 'react-router-dom'
import { Router } from '../../router'
import { texts } from '../../utils/texts'
import './index.css'

const Home = () => (
  <div className='home'>
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
      <h4 className='mt-40 title-2 bold'>{texts.home.registered}</h4>
      <p className='mt-10'>{texts.home.login}</p>
      <Link to='/login' className='mt-20 btn btn-line'>
        {texts.home.signIn}
      </Link>
    </div>
    <div className='home-right'>
      <h2 className='title-4 bold'>{texts.home.title}</h2>
      <p>
        {texts.home.beforeHere}{' '}
        <a className='btn-link p-0' href='#/'>
          here
        </a>{' '}
        {texts.home.afterHere}
        <br />
        <br />
        {texts.home.textOption}
      </p>
      <Link
        to={{
          pathname: Router.register,
          state: {
            type_id: 1,
          },
        }}
        className='mt-20 btn btn-primary'
      >
        {texts.home.button1}
      </Link>
      <Link
        to={{
          pathname: Router.register,
          state: {
            type_id: 2,
          },
        }}
        className='btn btn-secondary'
      >
        {texts.home.button2}
      </Link>
    </div>
  </div>
)

export default Home
