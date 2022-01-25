import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET, POST } from '../../utils/crud.js'
import Header from '../../components/Header'
import Datepicker from '../../components/Datepicker'
import { AuthContext } from '../../context/index.js'
import { Router } from '../../router/index.js'
import { texts } from '../../utils/texts.js'
import './index.css'

const Register = ({ location, history }) => {
  const { state } = useContext(AuthContext)
  const [sexes, setSexes] = useState([])
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState(null)
  const [validForm, setValidForm] = useState(false)

  let type_id = location?.state?.type_id || null
  if (!type_id) {
    history.push(Router.home)
  }
  const [form, setForm] = useState({
    type_id: type_id,
  })

  useEffect(() => {
    if (state.user) history.push('/login')
    const loadData = async () => {
      const { data, error } = await GET('/sexes')
      if (data) setSexes(data)
      if (error) console.log('Error loading sexes')
    }
    loadData()
  }, [])

  useEffect(() => {
    if (
      form?.first_name &&
      form?.last_name &&
      form?.sex_id &&
      form?.date_birth &&
      form?.email &&
      form?.password &&
      form?.password_confirmation &&
      form?.type_id
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [form])

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
    const { data, error } = await POST('/register', formData)
    if (error) setErrors(error)
    else {
      setStep(2)
      setForm({})
    }
  }

  return (
    <div className='container'>
      <Header />
      <div className='row vh-100'>
        {step <= 1 && (
          <form
            className='col-7 col-xl-12 start-xl-1 row mt-80 mb-20 '
            method='POST'
            onSubmit={handleSubmit}
          >
            <div className='col-10 start-2 row a-start'>
              <h2 className='col-12 title-4 bold'>{texts.register.title}</h2>
              <p className='col-12'>{texts.register.subtitle}</p>
              <div className='col-12 mt-10'></div>
              <div className={`col-6 col-md-12 ${step === 1 ? 'hide-xs' : ''}`}>
                <input
                  name='first_name'
                  type='text'
                  className='w-100'
                  placeholder={texts.register.input1}
                  onChange={handleInput}
                  value={form.first_name ? form.first_name : ''}
                  required
                />
                {errors?.first_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>

              <div className={`col-6 col-md-12 ${step === 1 ? 'hide-xs' : ''}`}>
                <input
                  name='middle_name'
                  type='text'
                  className='w-100'
                  placeholder={texts.register.input2}
                  onChange={handleInput}
                  value={form.middle_name ? form.middle_name : ''}
                />
                {errors?.middle_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-6 col-md-12 ${step === 1 ? 'hide-xs' : ''}`}>
                <input
                  name='last_name'
                  type='text'
                  className='w-100'
                  placeholder={texts.register.input3}
                  onChange={handleInput}
                  value={form.last_name ? form.last_name : ''}
                  required
                />
                {errors?.last_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-6 col-md-12 ${step === 1 ? 'hide-xs' : ''}`}>
                <input
                  name='maiden_name'
                  type='text'
                  className='w-100'
                  placeholder={texts.register.input4}
                  onChange={handleInput}
                  value={form.maiden_name ? form.maiden_name : ''}
                />
                {errors?.maiden_name?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-6 col-md-12 ${step === 0 ? 'hide-xs' : ''}`}>
                <select
                  name='sex_id'
                  className='w-100'
                  onChange={handleInput}
                  value={form.sex_id ? form.sex_id : ''}
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
              <div className={`col-6 col-md-12 ${step === 0 ? 'hide-xs' : ''}`}>
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
              <div className={`col-12 ${step === 0 ? 'hide-xs' : ''}`}>
                <input
                  name='email'
                  type='email'
                  className='w-100'
                  placeholder={texts.register.input7}
                  onChange={handleInput}
                  value={form.email ? form.email : ''}
                  required
                />
                {errors?.email?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-6 col-md-12 ${step === 0 ? 'hide-xs' : ''}`}>
                <input
                  name='password'
                  type='password'
                  className='w-100'
                  placeholder={texts.register.input8}
                  onChange={handleInput}
                  value={form.password ? form.password : ''}
                  required
                />
                {errors?.password?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-6 col-md-12 ${step === 0 ? 'hide-xs' : ''}`}>
                <input
                  name='password_confirmation'
                  type='password'
                  className='w-100'
                  placeholder={texts.register.input9}
                  onChange={handleInput}
                  value={form.password_confirmation ? form.password_confirmation : ''}
                  required
                />
                {errors?.password_confirmation?.map((error, key) => (
                  <p key={key} className='error'>
                    {error}
                  </p>
                ))}
              </div>
              <div className={`col-12 mt-20 text-center ${step === 1 ? 'hide-xs' : ''}`}>
                <Link to='/' className='btn-link'>
                  {texts.register.link}
                </Link>
              </div>
              <div className='col-12 mt-20 flex j-between a-center'>
                <Link to='/' className={`btn-back ${step === 1 ? 'hide-xs' : ''}`}>
                  {texts.buttons.back}
                </Link>
                <button
                  type='button'
                  className={`btn-link hide show-xs ${step === 0 ? 'hide-xs' : ''}`}
                  onClick={() => setStep(0)}
                >
                  {texts.buttons.back}
                </button>
                <button
                  type='button'
                  className={`btn btn-primary hide show-xs ${step === 1 ? 'hide-xs' : ''}`}
                  onClick={() => setStep(1)}
                  disabled={!form.first_name || !form.last_name}
                >
                  {texts.buttons.next}
                </button>
                <button
                  type='submit'
                  className={`btn btn-primary ${step === 0 ? 'hide-xs' : ''}`}
                  disabled={!validForm}
                >
                  {texts.buttons.register}
                </button>
              </div>
            </div>
          </form>
        )}
        {step === 2 && (
          <div className='col-7 col-xl-12 start-xl-1 row mt-80 mb-20 text-center'>
            <div className='col-8 start-3 flex a-center j-center'>
              <h2 className='title-4 bold'>
                {texts.register.text1}
                <br />
                {texts.register.text2}
              </h2>
            </div>
          </div>
        )}
        <img className='col-5 hide-xl register-image' src='/images/main.jpeg' alt='' />
      </div>
    </div>
  )
}

export default Register
