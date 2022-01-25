import { API } from '../utils/constants'
import { GET } from '../utils/crud'
export async function loginUser(dispatch, data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    let response = await fetch(`${API}/login`, requestOptions)
    let json = await response.json()
    if (json.data?.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: json.data })
      localStorage.setItem('state', JSON.stringify(json.data))
      const questions = await GET('/questions')
      dispatch({ type: 'LOAD_STEP', payload: questions.data.length + 6 })

      if (json.data.progress.step == 'nickname') {
        dispatch({ type: 'SET_STEP', payload: 2 })
      } else if (json.data.progress.step == 'location') {
        dispatch({ type: 'SET_STEP', payload: 3 })
      } else if (json.data.progress.step == 'relationship') {
        dispatch({ type: 'SET_STEP', payload: 4 })
      } else if (json.data.progress.step == 'questions') {
        dispatch({ type: 'SET_STEP', payload: json.data.progress.question_step + 5 })
      } else if (json.data.progress.step == 'bio') {
        dispatch({ type: 'SET_STEP', payload: questions.data.length + 6 - 1 })
      }
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...json.data,
          step: {
            current: 2,
            total: questions.data.length + 6,
          },
        })
      )
      dispatch({ type: 'LOGIN_ERROR', error: null })
      return json.data
    }
    if (json.error) dispatch({ type: 'LOGIN_ERROR', error: json.error })
    else dispatch({ type: 'LOGIN_ERROR', error: json.errors })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export async function logout(dispatch) {
  localStorage.removeItem('state')
  dispatch({ type: 'LOGOUT' })
}
