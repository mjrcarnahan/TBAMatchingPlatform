import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GET, POST } from '../../utils/crud.js'
import Header from '../../components/Header'
import { Router } from '../../router/index.js'
import { AuthContext } from '../../context/context.js'

const Verify = ({ history }) => {
  const { token } = useParams()
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const { state, dispatch } = useContext(AuthContext)
  useEffect(() => {
    const verifyAccount = async () => {
      setLoading(true)
      const { data, error } = await POST(`/user/verify/${token}`)

      if (data) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data,
        })
        localStorage.setItem('state', JSON.stringify(data))
        const questions = await GET('/questions')
        if (data.user.profile.type_id == 1)
          dispatch({ type: 'LOAD_STEP', payload: questions.data.length + 6 })
        else dispatch({ type: 'LOAD_STEP', payload: questions.data.length + 7 })
        localStorage.setItem(
          'state',
          JSON.stringify({
            ...data,
            step: {
              current: 2,
              total: questions.data.length + 6,
            },
          })
        )

        history.push(Router.complete)
      } else {
        history.push('/login')
      }
      setLoading(false)
    }
    verifyAccount()
  }, [])
  return (
    <div className='container'>
      <Header />
      <div className='row mh-100'>
        <form className='col-7 row mt-80 mb-20 text-center'>
          <div className='col-10 start-2 flex a-center'>
            {loading && (
              <div className='row gap-30'>
                <h2 className='col-12 title-5 bold'>Loading</h2>
              </div>
            )}
            {errors.length === 0 && !loading && (
              <div className='row gap-30'>
                <h2 className='col-12 title-5 bold'>
                  Registration complete! You are now ready to create your profile!
                </h2>
                <div className='col-12 mt-20 text-center'>
                  <Link to='/form/steps' className='btn-primary'>
                    NEXT
                  </Link>
                </div>
              </div>
            )}
            {errors.length > 0 && !loading && (
              <div className='row gap-30'>
                <h2 className='col-12 title-5 bold'>{errors[0]}</h2>
                <div className='col-12 mt-20 text-center'>
                  <Link to='/login' className='btn-link'>
                    Go to Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </form>
        <img className='col-5 form-image' src='/images/code.png' alt='' />
      </div>
    </div>
  )
}

export default Verify
