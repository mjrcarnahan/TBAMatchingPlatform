import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../../../components/Header'

import { goPage } from '../../../router'
import { GET, POSTFile } from '../../../utils/crud'
import { texts } from '../../../utils/texts'

const CreditReport = ({ history }) => {
  const [validForm, setValidForm] = useState(false)
  const [file, setFile] = useState(null)
  const [fileSave, setFileSave] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setFileSave(json.data.profile.report_url)
        setValidForm(document.querySelector('form').checkValidity())
      }
    }
    loadData()
  }, [])

  const loadFile = e => {
    if (e.target.files[0]) setFile(e.target.files[0])
  }

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await POSTFile('/profile/credit-report', formData)
      if (!data) {
        Swal.fire({
          title: 'Error',
          text: 'an error occurred while saving',
          icon: 'error',
          confirmButtonText: 'Close',
        })
        return
      }
    }
    goPage('next', history)
  }

  return (
    <div className='container'>
      <Header />
      <div className='mh-100'>
        <div className='background' style={{ backgroundImage: 'url(/images/background.png)' }} />
        <form
          onSubmit={e => {
            e.preventDefault()
            uploadFile()
          }}
          onChange={e => {
            setValidForm(e.currentTarget.checkValidity())
          }}
          className='layout'
        >
          <div className='layout-header mt-80'></div>
          <div className='layout-body'>
            <h2 className='title-4 bold'>Upload a copy of your credit report</h2>
            <p>
              FICO or Vantage scores above 600 signal financial stability. Submitting your credit
              score report from Equifax, TransUnion or Experian to The Biggest Ask will allow us to
              let intended parents know that you are in good standing.
              <br />
              This step is optional but will greatly improve your chances of matching.{' '}
            </p>
            <div>
              <label className='input-image' htmlFor='image'>
                <div className='input-image-container'>
                  <input
                    onChange={loadFile}
                    name='file'
                    id='image'
                    type='file'
                    accept='.pdf'
                    required={!fileSave}
                  />
                  {!file ? (
                    <>
                      {fileSave ? (
                        <>
                          <img src='/images/icons/file-success.png' alt='' />
                          <strong className='mt-5'>
                            {fileSave.split('/').pop().length <= 13
                              ? fileSave.split('/').pop()
                              : `...${fileSave.split('/').pop().slice(-13)}`}
                          </strong>
                          <p className='mt-20'>Click here to change file</p>
                        </>
                      ) : (
                        <>
                          <img src='/images/icons/file.png' alt='' />
                          <p className='mt-20'>Click here to upload file</p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <img src='/images/icons/file-success.png' alt='' />
                      <strong className='mt-5'>{file.name}</strong>
                      <p className='mt-20'>Click here to change file</p>
                    </>
                  )}
                </div>
              </label>
              {fileSave && (
                <a href={fileSave} target='_blank' className='btn btn-link'>
                  Download File
                </a>
              )}
            </div>
          </div>

          <footer className='layout-footer'>
            <button onClick={() => goPage('back', history)} className='btn-link pl-0'>
              {texts.buttons.back}
            </button>
            <button type='submit' className='btn-primary' disabled={!validForm}>
              {texts.buttons.next}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default CreditReport
