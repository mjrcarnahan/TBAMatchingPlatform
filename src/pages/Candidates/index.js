import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Switch from '@material-ui/core/Switch'

import Header from '../../components/Header'
import GoPro from '../../components/GoPro'
import Cards from '../../components/Cards'
import Modal from '../../components/Modal'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import { Router } from '../../router/'
import { GET } from '../../utils/crud'
import SelectState from '../../components/SelectState'
import './index.css'

const Candidates = () => {
  const [membership, setMembership] = useState(0)
  const [type_id, setType] = useState(0)
  const [modal, setModal] = useState(false)
  const [list, setList] = useState([])
  const [filter, setFilter] = useState({
    state: '',
    near: false,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const loadList = async () => {
      const json = await GET('/profiles')
      if (json.data) {
        setList(json.data || [])
      }
    }
    const loadData = async () => {
      const json = await GET('/profile')
      if (json.data) {
        setType(json.data.profile.type_id)
        setMembership(json.data.profile.membership_id)
      }
    }
    loadList()
    loadData()
  }, [])
  const openModal = () => {
    setModal(true)
  }

  const showBestMe = () => {
    if (type_id === 1 && membership === 1) {
      openModal()
    } else {
    }
  }

  const listFilter = () => {
    let listAux = [...list]
    if (filter.near) {
      listAux = [...listAux.filter(item => item.near)]
    }
    if (filter.state) {
      listAux = [...listAux.filter(item => item.state == filter.state)]
    }
    return listAux
  }
  if (list.length === 0) return <Loading />
  return (
    <div>
      <div className='container candidates'>
        <Header />
        <div className='mh-100 mt-80'>
          <div className='row gap-30'>
            <div className='col-10 start-2 col-xs-12 start-xs-1 row candidates-header'>
              <div className='col-12 col-xs-10 start-xs-2 row'>
                <h2 className='title-2 col-6 col-lg-12 bold'>
                  Let us introduce you to some amazing{' '}
                  {type_id == 1 ? 'surrogate' : 'intended parents'} candidates !
                </h2>
                {type_id === 1 && (
                  <div className='col-6 col-lg-12'>
                    <button
                      type='button'
                      className='btn-third flex a-center j-center'
                      onClick={showBestMe}
                    >
                      <FaStar className='mr-10' size='26' /> Display the best ones for me
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='col-10 start-2 col-xs-12 start-xs-1 candidates-filters flex j-between'>
              <div className='flex'>
                <h3 className='title-1'>Location:</h3>
                <SelectState
                  value={filter.state}
                  onChange={(e, value) => {
                    if (membership === 1 && type_id === 1) {
                      setModal(true)
                    } else {
                      setFilter({
                        ...filter,
                        state: value,
                      })
                    }
                  }}
                />
              </div>
              <div>
                All
                <Switch
                  name='near'
                  color='secondary'
                  checked={filter.near}
                  onChange={e => {
                    if (membership === 1 && type_id === 1) {
                      setModal(true)
                    } else {
                      setFilter({
                        ...filter,
                        near: e.target.checked,
                      })
                    }
                  }}
                />
                Near you
              </div>
            </div>

            {membership === 1 && type_id === 1 && (
              <GoPro className='col-10 start-2 col-md-12 start-md-1' />
            )}
            <Cards
              className='col-12'
              list={listFilter(list)}
              openModal={openModal}
              membership={membership}
              type_id={type_id}
            />
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        close={() => setModal(false)}
        body={
          <>
            <img src='/images/icons/access.svg' alt='' />
            <p className='col-12 text-center'>
              This feature is exclusive of Pro Members. Get access to the full version and unlock
              all our features.
            </p>
            <Link to={Router.gopro} className='btn-primary'>
              GO PRO
            </Link>
          </>
        }
      />
    </div>
  )
}

export default Candidates
