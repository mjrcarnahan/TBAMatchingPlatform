import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { FaStar } from 'react-icons/fa'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'

import { useHistory } from 'react-router'
import { Router } from '../../router'
import './index.css'

const Card = ({ data, openModal, membership, type_id }) => {
  const history = useHistory()

  const showBio = bio => {
    if (bio)
      if (bio.length <= 250) {
        return bio
      } else {
        const subString = bio.substring(0, 247).split(' ')
        subString.pop()
        return `${subString.join(' ')}...`
      }
    return ''
  }

  return (
    <div className='card col-12 row'>
      <div className='card-container col-10 start-2 col-md-12 start-md-1'>
        <div className='card-img'>
          <img className='img-flower' src='/images/flower.svg' alt='' />
          <img
            className='img-profile'
            src={data.picture_url ? data.picture_url : '/images/surrogate.png'}
            alt={data.nickname}
          />
        </div>
        <div className={`card-content ${data.recommended ? 'recommended' : ''}`}>
          <div className='card-content-header'>
            <div>
              <h3 className='title-6'>{data.nickname || 'N/D'}</h3>
              <h6>NICKNAME</h6>
            </div>
            {type_id === 1 && (data.many_times_surrogate || data.near) && (
              <div className='card-content-stars'>
                {data.many_times_surrogate && (
                  <div className='flex a-center'>
                    Experienced Surrogate <AiFillStar size='30' className='ml-5' />
                  </div>
                )}
                {data.near && (
                  <div className='flex a-center ml-10'>
                    Near you <ImLocation size='26' className='ml-5' />
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h4 className='title-2'>About {data.nickname}</h4>
            <p>{showBio(data?.bio)}</p>
          </div>
          <button
            type='button'
            onClick={() => {
              if (membership == 1 && type_id == 1) openModal()
              else history.push(`${Router.candidates}/${data.id}`)
            }}
            className='btn-primary'
          >
            See full profile
          </button>

          {(type_id === 2 || membership === 2) && data.recommended && (
            <div className='card-star text-center'>
              <h2 className='mb-10'>Recommended for you</h2>
              <FaStar />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Cards = ({ className, list, membership, openModal, type_id }) => {
  const [pagination, setPagination] = useState({
    total: 0,
    step: 0,
  })
  useEffect(() => {
    setPagination({
      total: Math.ceil(list.length / 10),
      step: 1,
    })
  }, [list])

  return (
    <div className={`${className} row`}>
      {list.map(
        (data, key) =>
          key >= (pagination.step - 1) * 10 &&
          key < pagination.step * 10 - 1 && (
            <Card
              data={data}
              openModal={openModal}
              membership={membership}
              type_id={type_id}
              key={key}
            />
          )
      )}
      <Pagination
        className='col-xs-12 start-xs-1 col-10 start-2 pagination'
        count={pagination.total}
        page={pagination.step}
        siblingCount={0}
        onChange={(e, value) => setPagination({ ...pagination, step: value })}
      />
    </div>
  )
}

export default Cards
