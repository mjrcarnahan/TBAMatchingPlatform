import React, { useContext, useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { texts } from '../../utils/texts'

import { GET, POST, PUT } from '../../utils/crud.js'
import Header from '../../components/Header'
import Datepicker from '../../components/Datepicker'
import './index.css'
import { Router } from '../../router'

const Spouse = ({ history }) => {
  const [sexes, setSexes] = useState([])
  const [form, setForm] = useState({})
  const [validForm, setValidForm] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setForm({ marital_id: json.data.profile.marital_id || '' })
      }
    }
    loadData()
  }, [])

  const skipStep = async () => {
    const { data, error } = await PUT('/profile/update', {
      spouse_check: false,
    })
    if (data) history.push(Router.candidates)
  }

  const handleInput = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = Object.assign({}, form)
    if (!formData.middle_name) delete formData.middle_name
    if (!formData.maiden_name) delete formData.maiden_name
    const { data, error } = await POST('/register/spouse', formData)

    if (data) {
      Swal.fire('Thank you for registering.', '', 'success').then(() => {
        history.push(Router.candidates)
      })
      setForm({})
      setErrors([])
    } else setErrors(error)
  }

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await GET('/sexes')
      if (data) {
        setSexes(data)
      }
      if (error) {
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (form?.first_name && form?.last_name && form?.sex_id && form?.date_birth && form?.email) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [form])

  return (
    <div className='container'>
      <Header />
      <div className='vh-100'>
        <form onSubmit={handleSubmit} className='layout'>
          <header className='layout-header'></header>
          <div className='row'>
            <div className='col-8 start-3 col-xl-10 start-xl-2 col-md-12 start-md-1 row a-start text-center mt-80'>
              <div className='col-12'>
                <h2 className='title-3 bold mb-10'>{texts.spouse.title}</h2>
                <p>{texts.spouse.subtitle}</p>
              </div>
              <div className='col-6 col-xs-12'>
                <input
                  name='first_name'
                  type='text'
                  className='w-100'
                  placeholder={texts.register.input1}
                  onChange={handleInput}
                  value={form.first_name || ''}
                  required
                />
                {errors?.first_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>

              <div className='col-6 col-xs-12'>
                <input
                  name='middle_name'
                  type='text'
                  className='w-100 '
                  placeholder={texts.register.input2}
                  onChange={handleInput}
                  value={form.middle_name || ''}
                />
                {errors?.middle_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className='col-6 col-xs-12'>
                <input
                  name='last_name'
                  type='text'
                  className='w-100 '
                  placeholder={texts.register.input3}
                  onChange={handleInput}
                  value={form.last_name || ''}
                  required
                />
                {errors?.last_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className='col-6 col-xs-12'>
                <input
                  name='maiden_name'
                  type='text'
                  className='w-100 '
                  placeholder={texts.register.input4}
                  onChange={handleInput}
                  value={form.maiden_name || ''}
                />
                {errors?.maiden_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className='col-6 col-xs-12'>
                <select
                  name='sex_id'
                  className='w-100 '
                  onChange={handleInput}
                  value={form.sex_id || ''}
                  required
                >
                  <option value=''>{texts.register.input5}</option>
                  {sexes.map(({ id, description }) => (
                    <option key={id} value={id}>
                      {description}
                    </option>
                  ))}
                </select>
                {errors?.sex_id?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className='col-6 col-xs-12'>
                <Datepicker
                  name='date_birth'
                  className='w-100'
                  placeholder={texts.register.input6}
                  onChange={handleInput}
                  value={form.date_birth ? form.date_birth : ''}
                  required
                />
                {errors?.date_birth?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className='col-12 col-xs-12'>
                <input
                  name='email'
                  type='email'
                  className='w-100 '
                  placeholder={texts.register.input7}
                  onChange={handleInput}
                  value={form.email || ''}
                  required
                />
                {errors?.email?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <footer className='layout-footer'>
            <button type='button' className='btn-link pl-0' onClick={skipStep}>
              {texts.buttons.skip}
            </button>
            <button type='submit' className='btn-primary' disabled={!validForm}>
              {texts.buttons.next}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default Spouse
