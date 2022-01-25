import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext, logout } from '../../context'
import './index.css'

const Header = () => {
  let history = useHistory()
  const { state, dispatch } = useContext(AuthContext)
  return (
    <header className='header'>
      <img className='header-logo-circle' src='/images/logo-circle.svg' alt='' />
      <Link to='/' className='header-logo'>
        <img className='header-logo-main' src='/images/logo.svg' alt='' />
      </Link>
      {state.user && (
        <button
          onClick={() => {
            logout(dispatch)
            history.push('/login')
          }}
        >
          {state?.user?.profile?.type_id == 1 ? 'Intended' : 'Surrogate'} Logout
        </button>
      )}
    </header>
  )
}

export default Header
