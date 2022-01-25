import React from 'react'
import Swal from 'sweetalert2'
import Header from '../../../components/Header'
import { goPage } from '../../../router'
import { PUT } from '../../../utils/crud'
import { texts } from '../../../utils/texts'
import './index.css'

const OBGYN = ({ history }) => {
  const updateProfile = async () => {
    const { data, error } = await PUT('/profile/update', {
      obgyn_file: null,
    })
    if (data) {
      goPage('next', history)
    } else {
      Swal.fire({
        title: 'Error',
        text: 'an error occurred while saving',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
  return (
    <div className='container'>
      <Header />
      <div className='obgyn mh-100'>
        <div className='background' style={{ backgroundImage: 'url(/images/background.png)' }} />
        <div className='layout'>
          <div className='layout-header'></div>
          <div className='layout-body obgyn-container'>
            <h2 className='title-4'>Provide your OBGYN recommendation</h2>
            <p>
              Have your OBGYN fill out{' '}
              <a href='#!' className='btn-link p-0'>
                this form
              </a>{' '}
              and then send the completed form to{' '}
              <a href='#!' className='btn-link p-0'>
                hello@thebiggestask.com
              </a>
              .
              <br />
              <br />
              This step is optional but will greatly improve your chances of matching.{' '}
            </p>
          </div>

          <footer className='layout-footer'>
            <button onClick={() => goPage('back', history)} className='btn-link pl-0'>
              {texts.buttons.back}
            </button>
            <button type='button' className='btn-primary' onClick={updateProfile}>
              {texts.buttons.next}
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default OBGYN
