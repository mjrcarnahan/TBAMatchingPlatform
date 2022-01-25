import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { AuthContext } from '../../context'
import { Router } from '../../router'
const Complete = () => {
  const { state } = useContext(AuthContext)
  return (
    <>
      <Header />
      <div className='layout'>
        <div className='layout-header'></div>
        <div className='layout-body'>
          <h2 className='title-3 bold'>
            Registration complete! You are now ready to create your profile!
          </h2>
          <p>
            The following list of 12-14 questions take approximately 15 minutes to complete. Many of
            the answers you provide will allow <strong>The Biggest Ask</strong> to make better
            surrogate matching suggestions.{' '}
            <span style={{ borderBottom: '1px solid black' }}>Click here</span> to see the list of
            questions before beginning the survey.
          </p>
          {state.user.rol_id === 2 && (
            <p>
              All the questions asked in the next few slides are ones that will be verified and fact
              checked by lawyers and fertility clinics after you have matched with your intended
              parent(s). Therefore, it is in your best interest to answer the questions as honestly
              as possible.
            </p>
          )}
          <Link to={Router.nickname} className='btn-primary'>
            Let's get started!
          </Link>
          <a href='/#' className='btn-link mt-10'>
            Why do I need to register at TBA?
          </a>
        </div>
        <div className='layout-footer'></div>
      </div>
    </>
  )
}

export default Complete
