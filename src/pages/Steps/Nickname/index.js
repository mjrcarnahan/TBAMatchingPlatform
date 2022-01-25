import React, { useState, useContext, useLayoutEffect } from 'react'

import Header from '../../../components/Header'
import ProgressBar from '../../../components/ProgressBar'
import { goPage } from '../../../router'
import { GET, PUT } from '../../../utils/crud'
import { AuthContext } from '../../../context'
import Swal from 'sweetalert2'
import { texts } from '../../../utils/texts'

const Nickname = ({ history }) => {
  const [form, setForm] = useState({ nickname: '' })
  const [validForm, setValidForm] = useState(false)
  const { dispatch } = useContext(AuthContext)

  useLayoutEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 2 })
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setForm({ nickname: json.data.profile.nickname || '' })
        setValidForm(document.querySelector('form').checkValidity())
      }
    }
    loadData()
  }, [])

  const updateProfile = async () => {
    const { data, error } = await PUT('/profile/update', {
      nickname: form.nickname,
    })
    if (data) {
      goPage('next', history)
    } else {
      Swal.fire({
        title: 'Error',
        text: 'an error occurred while saving',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
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
            <h2 className='title-3 bold mb-10'>{texts.nickname.title}</h2>
            <p>{texts.nickname.subtitle}</p>
          </div>
          <input
            name='nickname'
            value={form.nickname}
            onChange={({ target }) => setForm({ [target.name]: target.value })}
            type='text'
            className=''
            placeholder={texts.nickname.input}
            required
          />
          <button type='submit' className='btn-primary' disabled={!validForm}>
            {texts.buttons.next}
          </button>
        </div>
        <footer className='layout-footer'></footer>
      </form>
    </div>
  )
}

export default Nickname
