import React, { useState, useLayoutEffect, useContext } from 'react'

import Header from '../../../components/Header'
import ProgressBar from '../../../components/ProgressBar'

import { states } from '../../../utils/constants'
import { texts } from '../../../utils/texts'
import { GET, PUT } from '../../../utils/crud'
import { AuthContext } from '../../../context'
import { goPage } from '../../../router'
import './index.css'

const Live = ({ history }) => {
  const [validForm, setValidForm] = useState(false)
  const [form, setForm] = useState({
    state: '',
    city: '',
    state_old: '',
    city_old: '',
  })
  const [more, setMore] = useState(false)
  const { state, dispatch } = useContext(AuthContext)

  useLayoutEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 3 })
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setForm({
          state: json.data.profile.state || '',
          city: json.data.profile.city || '',
          state_old: json.data.profile.state_old || '',
          city_old: json.data.profile.city_old || '',
        })
        if (json.data.profile.state_old) {
          setMore(true)
        }
        setValidForm(document.querySelector('form').checkValidity())
      }
    }
    loadData()
  }, [])

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const updateProfile = async () => {
    const data = await PUT('/profile/update', form)
    if (data) {
      goPage('next', history)
    }
  }

  useLayoutEffect(() => {
    setValidForm(document.querySelector('form').checkValidity())
  }, [more])

  return (
    <div className='container'>
      <Header />

      <form
        onSubmit={e => {
          e.preventDefault()
          updateProfile()
        }}
        onChange={e => {
          setValidForm(e.currentTarget.checkValidity())
        }}
        className='layout'
      >
        <ProgressBar />

        <div className='layout-body'>
          <div>
            <h2 className='title-3 bold mb-10'>{texts.location.title}</h2>
            <p>{texts.location.subtitle}</p>
          </div>
          <select name='state' value={form['state']} onChange={handleInput} required>
            <option value=''>{texts.location.input1}</option>
            {states.map((state, key) => (
              <option key={key} value={state.description}>
                {state.description}
              </option>
            ))}
          </select>
          <select name='city' value={form['city']} onChange={handleInput} required>
            <option value=''>{texts.location.input2}</option>
            {states.find(state => state.description === form['state']) &&
              states
                .find(state => state.description === form['state'])
                .cities.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
          </select>
          <div className='mt-10'>
            <h3 className='title-1 bold mb-10'>{texts.location.text}</h3>
            <button
              type='button'
              className='btn-link text-center p-0'
              onClick={() => {
                setMore(!more)
              }}
            >
              {texts.location.link}
            </button>
          </div>
          {more && (
            <>
              <select
                className='mt-10'
                name='state_old'
                value={form['state_old']}
                onChange={handleInput}
                required={more}
              >
                <option value=''>{texts.location.input1}</option>
                {states.map((state, key) => (
                  <option key={key} value={state.description}>
                    {state.description}
                  </option>
                ))}
              </select>
              <select
                name='city_old'
                value={form['city_old']}
                onChange={handleInput}
                required={more}
              >
                <option value=''>{texts.location.input2}</option>
                {states.find(state => state.description === form['state_old']) &&
                  states
                    .find(state => state.description === form['state_old'])
                    .cities.map((item, key) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
              </select>
            </>
          )}
        </div>

        <footer className='layout-footer'>
          <button onClick={() => goPage('back', history)} className='btn-link pl-0'>
            {texts.buttons.back}
          </button>
          <button type='submit' className='btn-primary' disabled={!validForm}>
            {texts.buttons.next}
          </button>
        </footer>
      </form>
    </div>
  )
}

export default Live
