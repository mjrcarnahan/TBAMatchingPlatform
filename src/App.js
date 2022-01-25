import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from './context'
import { Router, redirect } from './router'
import { GET } from './utils/crud'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import './global.css'

import Home from './pages/Home'
import Login from './pages/Auth/Login.js'
import RecoverPassword from './pages/Auth/RecoverPassword.js'
import ResetPassword from './pages/Auth/ResetPassword.js'
import Register from './pages/Register'
import RegisterComplete from './pages/Register/Complete'
import Error404 from './pages/Errors/Error404'
import Nickname from './pages/Steps/Nickname'
import Location from './pages/Steps/Location'
import Relationship from './pages/Steps/Relationship'
import Questions from './pages/Steps/Questions'
import Bio from './pages/Steps/Bio'
import OBGYN from './pages/Steps/OBGYN'
import CreditReport from './pages/Steps/CreditReport'
import Spouse from './pages/Register/Spouse'
import Picture from './pages/Steps/Picture'
import Verifiy from './pages/Verify'
import Candidates from './pages/Candidates'
import Candidate from './pages/Candidate'
import Thanks from './pages/Thanks'
import Profile from './pages/Profile'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(localStorage.getItem('state'))?.token
    ? JSON.parse(localStorage.getItem('state'))?.token
    : null
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: Router.auth.login,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const RouteList = ({ history }) => {
  useEffect(() => {
    const onLoad = async () => {
      const json = await GET('/profile')
      const newState = {
        ...JSON.parse(localStorage.getItem('state')),
        rol_id: json.data.profile.type_id,
        profile: json.data.profile,
        progress: json.data.progress,
      }
      localStorage.setItem('state', JSON.stringify(newState))
      redirect(json?.data?.progress?.step, history)
    }
    if (localStorage.getItem('state')) {
      onLoad()
    }
  }, [])

  return (
    <div>
      <Switch>
        {/* Auth */}
        <Route exact path={Router.home} component={Home} />
        <Route exact path={Router.auth.login} component={Login} />
        <Route exact path={Router.auth.recover} component={RecoverPassword} />
        <Route exact path={Router.auth.reset} component={ResetPassword} />
        <Route exact path={Router.auth.verify} component={Verifiy} />

        {/* Register and Questions */}
        <Route exact path={Router.register} component={Register} />
        <PrivateRoute exact path={Router.complete} component={RegisterComplete} />
        <PrivateRoute exact path={Router.nickname} component={Nickname} />
        <PrivateRoute exact path={Router.location} component={Location} />
        <PrivateRoute exact path={Router.relationship} component={Relationship} />
        <PrivateRoute exact path={Router.questions} component={Questions} />
        <PrivateRoute exact path={Router.bio} component={Bio} />
        <PrivateRoute exact path={Router.picture} component={Picture} />
        <PrivateRoute exact path={Router.spouse} component={Spouse} />
        <PrivateRoute exact path={Router.candidates} component={Candidates} />
        <PrivateRoute exact path={Router.Candidate} component={Candidate} />
        <PrivateRoute exact path={Router.obgyn} component={OBGYN} />
        <PrivateRoute exact path={Router.credit_report} component={CreditReport} />
        <Route exact path={Router.done} component={Thanks} />

        {/* Surrogate */}
        <Route exact path={Router.surrogate.profile} component={Profile} />

        <Route path='*' component={Error404} />
      </Switch>
    </div>
  )
}
const App = () => {
  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#ae4b2b',
      },
      secondary: {
        main: '#1b3661',
      },
    },
  })
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/' component={RouteList} />
              <Route path='*' component={Error404} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
