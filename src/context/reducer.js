export const initialState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : {}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_STATE':
      return {}
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: '',
        token: '',
        progress: '',
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case 'LOADING_TRUE':
      return {
        ...state,
        loading: true,
      }

    case 'LOADING_FALSE':
      return {
        ...state,
        loading: false,
      }

    case 'LOAD_STEP':
      return {
        ...state,
        step: {
          total: action.payload,
          current: 2,
        },
      }
    case 'SET_STEP':
      return {
        ...state,
        step: {
          ...state.step,
          current: action.payload,
        },
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
