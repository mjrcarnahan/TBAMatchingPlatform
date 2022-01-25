import React, { useState, useEffect } from 'react'
import { GET, POSTFile, PUT } from '../../../utils/crud'
import Header from '../../../components/Header'
import Modal from '../../../components/Modal'

import { goPage, Router } from '../../../router'
import Swal from 'sweetalert2'
import './index.css'
import { texts } from '../../../utils/texts'

const Picture = ({ history }) => {
  const [image, setImage] = useState(null)
  const [modal, setModal] = useState(null)
  const [file, setFile] = useState(null)
  const [profile, setProfile] = useState(null)
  const [validForm, setValidForm] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setImage(json.data.profile.picture_url || null)
        setProfile(json.data.profile)
      }
    }
    loadData()
  }, [])

  const loadImage = e => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    }
  }

  const redirect = answer => {
    if (answer === 'Yes') {
      PUT('/profile/update', {
        spouse_check: true,
      })
      goPage('next', history)
    } else {
      PUT('/profile/update', {
        spouse_check: false,
      })
      setModal(1)
    }
  }

  const updateImage = async () => {
    // modal 0 recommendation
    // modal 1 congratulation
    // modal 2 spouse
    if (file) {
      const formData = new FormData()
      formData.append('picture', file)
      const { data } = await POSTFile('/profile/picture', formData)
      if (!data) {
        Swal.fire({
          title: 'Error',
          text: 'an error occurred while saving',
          icon: 'error',
          confirmButtonText: 'Close',
        })
        return
      }
      if (profile.type_id === 1) {
        if (profile.marital_id !== 1) {
          setModal(2)
        } else {
          setModal(1)
        }
      } else {
        setModal(1)
      }
    } else if (image) {
      if (profile.type_id === 1) {
        if (profile.marital_id !== 1) {
          setModal(2)
        } else {
          setModal(1)
        }
      } else {
        setModal(1)
      }
    } else {
      if (profile.type_id === 1) {
        setModal(0)
      }
    }
  }

  const removePhoto = () => {
    Swal.fire({
      title: 'Remove Photo',
      text: 'Are you sure you want to delete the photo?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        const { data, error } = PUT('/profile/update', {
          picture: '',
        })
        setFile(null)
        setImage(null)
        document.querySelector('input').value = null
        setValidForm(document.querySelector('form').checkValidity())
      }
    })
  }

  return (
    <div className='container'>
      <Header />
      <div className='mh-100'>
        <div className='background' style={{ backgroundImage: 'url(/images/background.png)' }} />
        <form
          onSubmit={e => {
            e.preventDefault()
            updateImage()
          }}
          onChange={e => {
            setValidForm(e.currentTarget.checkValidity())
          }}
          className='layout'
        >
          <div className='layout-header'></div>
          <div className='layout-body'>
            <h2 className='title-4 bold'>{texts.picture.title}</h2>
            <div>
              <label className='input-image' htmlFor='image'>
                <div className='input-image-container'>
                  <input
                    onChange={loadImage}
                    id='image'
                    type='file'
                    name='photo'
                    accept='image/*'
                    required={profile?.type_id === 2 && !image}
                  />
                  {!image ? (
                    <>
                      <img src='/images/icons/camera.svg' alt='' />
                      <p className='mt-20 '>{texts.picture.help}</p>
                    </>
                  ) : (
                    <>
                      <img className='photo-upload' src={image} alt='' />
                      <p className='photo-upload-description bold'>{texts.picture.change}</p>
                    </>
                  )}
                </div>
              </label>
              {(image || file) && (
                <button type='button' onClick={removePhoto} className='text-center btn-link mt-10'>
                  {texts.picture.removeLink}
                </button>
              )}
            </div>

            {!image && profile?.type_id === 1 && (
              <button onClick={e => setModal(0)} className='btn-link text-center col-12'>
                {texts.picture.later}
              </button>
            )}
          </div>
          <footer className='layout-footer'>
            <button onClick={() => goPage('back', history)} className='btn-link pl-0'>
              {texts.buttons.back}
            </button>
            <button type='submit' className='btn-primary' disabled={!validForm && !image}>
              {texts.buttons.next}
            </button>
          </footer>
        </form>
      </div>

      <Modal
        open={modal == 0 ? true : false}
        close={() => setModal(null)}
        body={
          <>
            <p>{texts.picture.recommendText}</p>
            <button
              type='button'
              onClick={() => {
                setModal(null)
                document.querySelector('label').click()
              }}
              className='btn-primary'
            >
              {texts.picture.recommendButton}
            </button>
            <button
              onClick={() => {
                if (profile.marital_id !== 1) {
                  setModal(2)
                } else {
                  setModal(1)
                }
                PUT('/profile/update', {
                  picture: '',
                })
              }}
              className='btn-link text-center'
            >
              {texts.picture.recommendLink}
            </button>
          </>
        }
      />

      <Modal
        open={modal == 1 ? true : false}
        close={() => setModal(null)}
        body={
          <>
            <div className='photo'>
              <div className='photo-image'>
                <img src={image ? image : '/images/icons/check.png'} alt='' />
              </div>
            </div>
            <h3 className='text-primary bold title-2'>{texts.picture.congratulationTitle}</h3>
            <p>{texts.picture.congratulationText}</p>
            <button
              onClick={() => {
                history.push(Router.candidates)
              }}
              type='button'
              className='btn-primary'
            >
              {texts.picture.congratulationButton}
            </button>
          </>
        }
      />
      <Modal
        open={modal == 2 ? true : false}
        close={() => setModal(null)}
        body={
          <>
            <div>
              <div className='photo'>
                <div className='photo-image'>
                  <img src='/images/icons/check.png' alt='' />
                </div>
              </div>
            </div>
            <h3 className='title-3 bold text-center'>{texts.picture.spouseTitle}</h3>
            <div className='w-100 flex j-between'>
              <button onClick={() => redirect('No')} className='btn-gray'>
                {texts.picture.spouseCancel}
              </button>
              <button onClick={() => redirect('Yes')} className='btn-primary'>
                {texts.picture.spouseConfirm}
              </button>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Picture
