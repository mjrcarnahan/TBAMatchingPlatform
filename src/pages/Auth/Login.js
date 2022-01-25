import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, loginUser } from '../../context'
import { redirect } from '../../router'
import { texts } from '../../utils/texts'

const Login = ({ history }) => {
  const { state, dispatch } = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleInput = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value,
    })

  const handleSubmit = async e => {
    e.preventDefault()
    await loginUser(dispatch, form)
  }

  useEffect(() => {
    redirect(state?.progress?.step, history)
  }, [state])

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
      <form className='home-right' method='POST' onSubmit={handleSubmit}>
        <h2 className='title-5 bold mb-20'>{texts.login.title}</h2>
        <div className='input'>
          <input
            name='email'
            type='email'
            className='w-100'
            placeholder={texts.login.input1}
            onChange={handleInput}
            value={form.email}
            required
          />
          {state?.error?.email &&
            state.error.email.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
        </div>
        <div className='input'>
          <input
            name='password'
            type='password'
            className='w-100'
            placeholder={texts.login.input2}
            onChange={handleInput}
            value={form.password}
            required
          />
          {state?.error?.password &&
            state.error.password.map((error, key) => (
              <p className='error' key={key}>
                {error}
              </p>
            ))}
        </div>
        {state.error && typeof state.error === 'string' && (
          <div className='error'>{state.error}</div>
        )}

        <button type='submit' className='btn-primary'>
          {texts.login.button}
        </button>

        <Link to='recover/password' className='text-center mt-20 btn-link'>
          {texts.login.link1}
        </Link>
        <p className='text-center mt-20'>
          {texts.login.text}{' '}
          <Link to='/' className='btn-link text-primary p-0'>
            {texts.login.link2}
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
