import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import { Link, useParams } from 'react-router-dom'
import { POST } from '../../utils/crud.js'
import { AuthContext } from '../../context/context.js'

const ResetPassword = ({ history }) => {
  const { dispatch } = useContext(AuthContext)

  const { token } = useParams()
  const [form, setForm] = useState({
    email: '',
    password: '',
    token,
  })
  const [errors, setErrors] = useState([])

  useEffect(() => {
    localStorage.removeItem('state')
    dispatch({ type: 'INIT_STATE' })
  }, [])
  const handleInput = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value,
    })

  const handleSubmit = async e => {
    e.preventDefault()
    const { data, error } = await POST('/user/password-reset', form)
    if (error) {
      setErrors(error)
    } else {
      setErrors([])
      Swal.fire({
        title: 'Success',
        text: 'Your password has been updated',
        icon: 'success',
        confirmButtonText: 'Go to Sign In',
      }).then(result => {
        history.push('/login')
      })
    }
  }

  return (
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

      <form method='POST' onSubmit={handleSubmit} className='home-right'>
        <h2 className='title-5 bold mb-20'>Reset password</h2>
        <div className='input'>
          <input
            name='password'
            type='password'
            className='w-100'
            placeholder='Enter password'
            onChange={handleInput}
            required
          />
          {errors?.password &&
            errors.password.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
        </div>
        <div className='input'>
          <input
            name='password_confirmation'
            type='password'
            className='w-100'
            placeholder='Confirmed password'
            onChange={handleInput}
            required
          />
          {errors?.password_confirmation &&
            errors.password_confirmation.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
        </div>
        {errors?.token && (
          <div className='input'>
            {errors.token.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
          </div>
        )}
        <button type='submit' className='btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
