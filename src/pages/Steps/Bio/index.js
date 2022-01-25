import React, { useState, useLayoutEffect, useContext } from 'react'
import ProgressBar from '../../../components/ProgressBar'
import Header from '../../../components/Header'

import { AuthContext } from '../../../context'
import { texts } from '../../../utils/texts'
import { GET, PUT } from '../../../utils/crud'
import { goPage } from '../../../router'
import Swal from 'sweetalert2'

const Bio = ({ history }) => {
  const [form, setForm] = useState({
    bio: '',
  })
  const [validForm, setValidForm] = useState(false)
  const { state, dispatch } = useContext(AuthContext)

  useLayoutEffect(() => {
    dispatch({ type: 'SET_STEP', payload: state.step.total - 1 })
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setForm({
          bio: json.data.profile.bio,
        })
        setValidForm(document.querySelector('form').checkValidity())
      }
    }
    loadData()
  }, [])

  const updateProfile = async () => {
    const { data, error } = await PUT('/profile/update', form)
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
        className='layout'
        onSubmit={e => {
          e.preventDefault()
          updateProfile()
        }}
        onChange={e => {
          setValidForm(e.currentTarget.checkValidity())
        }}
      >
        <ProgressBar />
        <div className='layout-body'>
          <div>
            <h2 className='title-3 bold mb-10'>{texts.bio.title}</h2>
            <p>{texts.bio.subtitle}</p>
          </div>
          <textarea
            name='bio'
            onChange={e => setForm({ bio: e.target.value })}
            defaultValue={form.bio}
            rows='7'
            className='w-100'
            placeholder='Short Bio...'
            required
          ></textarea>
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

export default Bio
