import React, { useState, useLayoutEffect, useContext } from 'react'

import Header from '../../../components/Header'
import ProgressBar from '../../../components/ProgressBar'
import { texts } from '../../../utils/texts'
import { GET, PUT } from '../../../utils/crud'
import { goPage } from '../../../router'
import { AuthContext } from '../../../context'

const Relation = ({ history }) => {
  const options = [
    {
      id: 1,
      description: 'I am single',
    },
    {
      id: 2,
      description: 'I am married',
    },
    {
      id: 3,
      description: 'I am in a committed relationship',
    },
  ]

  const { state, dispatch } = useContext(AuthContext)
  const [validForm, setValidForm] = useState(false)
  const [form, setForm] = useState({ marital_id: '' })

  useLayoutEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 4 })
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setForm({ marital_id: json.data.profile.marital_id || '' })
        if (document.querySelector('form'))
          setValidForm(document.querySelector('form').checkValidity())
      }
    }
    loadData()
  }, [])

  const updateProfile = async () => {
    const data = await PUT('/profile/update', {
      marital_id: form.marital_id,
    })
    if (data) {
      goPage('next', history)
    }
  }

  return (
    <div className='container'>
      <Header />
      <form
        className='layout'
        onSubmit={e => {
          e.preventDefault()
          updateProfile({
            marital_id: form,
          })
        }}
        onChange={e => {
          setValidForm(e.currentTarget.checkValidity())
        }}
      >
        <ProgressBar />
        <div className='layout-body'>
          <h2 className='title-3 bold'>{texts.relationship.title}</h2>
          {options.map((option, key) => (
            <div key={key} className='radio w-input'>
              <input
                name='marital_id'
                type='radio'
                id={key}
                value={option.id}
                onChange={({ target }) => setForm({ [target.name]: target.value })}
                checked={option.id == form.marital_id}
                required
              />
              <label htmlFor={key}>{option.description}</label>
            </div>
          ))}
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

export default Relation
