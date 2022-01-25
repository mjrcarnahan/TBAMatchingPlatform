import React, { createContext, useReducer } from 'react'
import { initialState, AuthReducer } from './reducer'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
