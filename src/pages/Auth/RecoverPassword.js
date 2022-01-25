import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom'
import { POST } from '../../utils/crud.js'
import { texts } from '../../utils/texts.js'

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: '',
  })
  const [errors, setErrors] = useState([])
  const handleInput = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value,
    })

  const handleSubmit = async e => {
    e.preventDefault()
    const { data, error } = await POST('/user/send-password-reset', form)
    if (error) setErrors(error)
    else if (data) {
      setErrors([])
      Swal.fire(
        'Email Sent',
        `We sent an email with instructions to restore your password.
Please give 5 minutes or check your spam folder if you don’t see it.`,
        'success'
      )
      setForm({ email: '' })
    }
  }
  return (
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
      </div>

      <form method='POST' onSubmit={handleSubmit} className='home-right'>
        <h2 className='title-5 bold'>{texts.recover.title}</h2>
        <p>{texts.recover.subtitle}</p>
        <div className='mt-20 input'>
          <input
            name='email'
            type='email'
            className='w-100'
            placeholder={texts.recover.input}
            onChange={handleInput}
            value={form.email}
            required
          />
          {errors?.email &&
            errors.email.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
        </div>

        <button type='submit' className='btn-primary'>
          {texts.recover.button}
        </button>
        <Link to='/login' className='text-center mt-20 btn-link'>
          {texts.recover.link}
        </Link>
      </form>
    </div>
  )
}

export default ResetPassword
