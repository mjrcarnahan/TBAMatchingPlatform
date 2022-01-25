import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Router } from '../../router'
import './index.css'

const GoPro = ({ className }) => (
  <div className={`${className} go-pro flex j-between`}>
    <p className='title-2 bold'>Get Access to the full version, and unlock all of our features</p>
    <Link to={Router.gopro} className='btn-white pl-60 pr-60'>
      GO PRO
    </Link>
  </div>
)

export default GoPro
