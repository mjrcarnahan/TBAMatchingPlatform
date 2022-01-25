import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

import Header from '../../../components/Header'

import { GET, POST } from '../../../utils/crud.js'
import { goPage } from '../../../router'
import { texts } from '../../../utils/texts'
import ProgressBar from '../../../components/ProgressBar'
import { AuthContext } from '../../../context'

import './index.css'

const Questions = ({ history, location }) => {
  const { state, dispatch } = useContext(AuthContext)

  const [questions, setQuestions] = useState([])

  const [step, setStep] = useState(0)

  const [isCorrect, setIsCorrect] = useState(null)
  const [form, setForm] = useState({})
  const [validForm, setValidForm] = useState(false)
  const elementForm = useRef(null)

  useLayoutEffect(() => {
    const loadProfile = async () => {
      const json = await GET('/profile')
      if (!location?.state?.direction) {
        if (json.data) setStep(json.data.progress.question_step)
      }
    }

    const loadQuestions = async () => {
      const jsonAnwers = await GET('/get-answers')

      if (jsonAnwers.data) {
        setForm({
          ...jsonAnwers.data.map(item => {
            if (item.answers.length === 0) return null
            else {
              if (item.question_type_id === 1) {
                if (item.answers[0].option.has_comment) {
                  return {
                    id: item.answers[0].option_id,
                    answer: item.answers[0].answer,
                    comment: item.answers[0].option.has_comment ? true : false,
                  }
                }
                return item.answers[0].option_id
              }
              if (item.question_type_id === 2) return item.answers.map(aux => aux.option_id + '')
              if (item.question_type_id === 3) {
                return {
                  id: item.answers[0].option_id + '',
                  answer: item.answers[0].answer,
                }
              } else {
                return null
              }
            }
          }),
        })
        if (location?.state?.direction) {
          if (location.state.direction == 'back') {
            setStep(jsonAnwers.data.length - 1)
            setValidForm(true)
          }
          if (location.state.direction == 'next') {
            setStep(0)
            if (jsonAnwers?.data[0]?.answers?.length > 0) {
              setValidForm(true)
            }
          }
        }
      }

      const jsonQuestions = await GET('/questions')
      if (jsonQuestions.data) {
        setQuestions(jsonQuestions.data)
      }
    }

    const loadData = async () => {
      await loadProfile()
      await loadQuestions()
    }

    loadData()
  }, [])

  useLayoutEffect(() => {
    dispatch({ type: 'SET_STEP', payload: step + 5 })
    if (elementForm.current) setValidForm(elementForm.current.checkValidity())
    if (form[step - 1] == 49 && step == 9) setStep(step + 2)
  }, [form, step, validForm])

  useEffect(() => {
    if (step === questions.length && questions.length > 0) goPage('next', history)
  }, [step])

  const updateQuestion = async question => {
    let options

    if (form[question].id) {
      options = {
        options: [
          {
            id: form[question].id,
            answer: form[question].answer,
          },
        ],
      }
    } else if (Array.isArray(form[question])) {
      options = {
        options: [
          ...form[question].map(item => ({
            id: item,
            answer: null,
          })),
        ],
      }
    } else {
      options = {
        options: [
          {
            id: form[question],
            answer: null,
          },
        ],
      }
    }

    const data = await POST('/answers', options)
  }

  const next = () => {
    if (state.user.rol_id === 2 && form[8] == 49 && step === 8) {
      setStep(step + 3)
    } else setStep(step + 1)
    dispatch({ type: 'SET_STEP', payload: step + 5 })
  }

  const back = () => {
    if (step === 0) {
      goPage('back', history)
    } else if (state.user.rol_id === 2 && form[8] == 49 && step === 11) {
      setStep(step - 3)
    } else setStep(step - 1)
    dispatch({ type: 'SET_STEP', payload: step + 5 })
  }

  const validCorrectAnswer = option => {
    setIsCorrect(option.is_correct)
    if (option.is_correct === 0) {
      Swal.fire({
        title: 'Warning',
        text:
          'Unfortunately, you do not meet the criteria to be a surrogate listed on “The Biggest Ask”',
        icon: 'warning',
        confirmButtonText: 'Close',
      })
    }
  }

  const onChange = (name, value, type, opcion, has_comment, checked) => {
    if (type === 1) {
      if (!has_comment)
        setForm({
          ...form,
          [name]: value,
          comment: false,
        })
      else {
        if (opcion === 'opcion')
          setForm({
            ...form,
            [name]: {
              id: value,
              comment: true,
            },
          })
        else
          setForm({
            ...form,
            [name]: {
              id: form[name].id,
              answer: value,
              comment: true,
            },
          })
      }
    } else if (type == 2) {
      const items = form[name] || []
      if (checked)
        setForm({
          ...form,
          [name]: [...items, value],
        })
      else {
        setForm({
          ...form,
          [name]: [...items.filter(item => item !== value)],
        })
      }
    } else if (type == 3) {
      setForm({
        ...form,
        [name]: {
          id: value,
          answer: has_comment,
        },
      })
    }
  }

  return (
    <div className='container'>
      <Header />
      {questions.map((question, key) => {
        const length = Math.max(...question.options.map(item => item.title.length))
        if (key === step) {
          return (
            <form
              ref={elementForm}
              key={key}
              onSubmit={e => {
                e.preventDefault()
                next()

                updateQuestion(step)
              }}
              autoComplete='off'
              className='layout'
            >
              <ProgressBar />

              <div className='layout-body'>
                <div>
                  {question.title && <h2 className='title-3 bold mb-10'>{question.title}</h2>}
                  {question.description && <p>{question.description}</p>}
                </div>
                {/* Radio Shorts */}
                {question.question_type.id === 1 && length <= 10 && (
                  <div className='radio-shorts'>
                    {question.options.map((option, key) => {
                      return (
                        <div key={key} className='col-2 radio mb-20'>
                          <input
                            id={`radio${key}`}
                            type='radio'
                            name={step}
                            value={option.id}
                            onClick={() => {
                              validCorrectAnswer(option)
                            }}
                            onChange={e => {
                              onChange(step, e.target.value, 1, 'opcion', option.has_comment)
                            }}
                            checked={option.id == form[step] || option.id == form[step]?.id}
                            required
                          />
                          <label htmlFor={`radio${key}`}>{option.title}</label>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Radio Medium */}
                {question.question_type.id === 1 && length >= 11 && length <= 30 && (
                  <>
                    {question.options.map((option, key) => (
                      <div key={key} className='radio w-input'>
                        <input
                          id={`radio${key}`}
                          type='radio'
                          name={step}
                          value={option.id}
                          onClick={() => {
                            validCorrectAnswer(option)
                          }}
                          onChange={e => {
                            onChange(step, e.target.value, 1, 'opcion', option.has_comment)
                          }}
                          checked={option.id == form[step]}
                          required
                        />
                        <label htmlFor={`radio${key}`}>{option.title}</label>
                      </div>
                    ))}
                  </>
                )}

                {/* Radio Large*/}
                {question.question_type.id === 1 && length > 30 && (
                  <>
                    {question.options.map((option, key) => (
                      <div key={key} className='radio w-input-large'>
                        <input
                          id={`radio${key}`}
                          type='radio'
                          name={step}
                          value={option.id}
                          onClick={() => {
                            validCorrectAnswer(option)
                          }}
                          onChange={e => {
                            onChange(step, e.target.value, 1, 'opcion', option.has_comment)
                          }}
                          checked={option.id == form[step]}
                          required
                        />
                        <label htmlFor={`radio${key}`}>{option.title}</label>
                      </div>
                    ))}
                  </>
                )}

                {/* Radio and Input */}
                {question.question_type.id === 3 && (
                  <InputRadio
                    id={question.id}
                    name={step}
                    options={question.options}
                    value={form[step]}
                    onChange={onChange}
                  />
                )}

                {/* Checkbox */}
                {question.question_type.id === 2 && (
                  <>
                    {question.options.map((option, key) => (
                      <div key={key} className='w-input radio'>
                        <input
                          id={`radio${key}`}
                          type='checkbox'
                          name={step}
                          value={option.id}
                          checked={form[step]?.includes(option?.id + '')}
                          onChange={e => {
                            onChange(
                              step,
                              e.target.value,
                              2,
                              'opcion',
                              option.has_comment,
                              e.target.checked
                            )
                          }}
                          required={!form[step] || form[step]?.length == 0}
                        />
                        <label htmlFor={`radio${key}`}>{option.title}</label>
                      </div>
                    ))}
                  </>
                )}

                {/* Has Comment */}
                {form[step]?.comment && (
                  <div className='w-input-large'>
                    <p>Share what happened</p>
                    <textarea
                      name={step}
                      placeholder='Be as detailed as possible'
                      className='w-input-large'
                      rows='5'
                      onChange={e => {
                        onChange(step, e.target.value, 1, 'text', 1)
                      }}
                      value={form[step].answer}
                      required
                    />
                  </div>
                )}
              </div>

              <footer className='layout-footer'>
                <button type='button' onClick={() => back()} className='pl-0 btn-link'>
                  {texts.buttons.back}
                </button>
                <button
                  type='submit'
                  className='btn-primary '
                  disabled={!validForm || isCorrect === 0}
                >
                  {texts.buttons.next}
                </button>
              </footer>
            </form>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

const InputRadio = props => {
  const [state, setstate] = useState(props.value?.id || '')
  const [text, settext] = useState(props.value?.answer || '')
  return (
    <>
      {props.options &&
        props.options.map((option, key) =>
          option.title === 'input' ? (
            <input
              key={key}
              name={`${props.name}`}
              type='text'
              placeholder='Please specify'
              value={text}
              onChange={e => {
                if (props?.options[0]?.id == 52) {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setstate(e.target.value)
                    settext(e.target.value)
                    props.onChange(props.name, option.id, 3, null, e.target.value)
                  }
                } else {
                  setstate(e.target.value)
                  settext(e.target.value)
                  props.onChange(props.name, option.id, 3, null, e.target.value)
                }
              }}
              required={!state}
            />
          ) : (
            <div key={key} className='radio w-input text-center'>
              <input
                name={props.name}
                id={`radio${key}`}
                type='radio'
                value={option.id}
                onChange={e => {
                  setstate(e.target.value)
                  settext('')
                  props.onChange(props.name, option.id, 3, null, null)
                }}
                checked={option.id == state}
                required={!state}
              />
              <label htmlFor={`radio${key}`}>{option.title}</label>
            </div>
          )
        )}
    </>
  )
}
export default Questions
