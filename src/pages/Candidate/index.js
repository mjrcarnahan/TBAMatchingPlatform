import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { AuthContext } from '../../context'
import { FaChild, FaStar } from 'react-icons/fa'
import { GrLocationPin } from 'react-icons/gr'
import { IoLocationSharp } from 'react-icons/io5/'
import { AiOutlineNumber, AiOutlineRight } from 'react-icons/ai'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import { Router } from '../../router'
import { GET } from '../../utils/crud'
import { Link } from 'react-router-dom'
import './index.css'

const Candidate = () => {
  const { state } = useContext(AuthContext)
  const { id } = useParams()
  const [profile, setProfile] = useState({})

  const showBio = (bio, part) => {
    if (bio) {
      if (bio.length <= 120) {
        return bio
      } else {
        let subString = bio.substring(0, 120).split(' ')
        subString.pop()
        if (part == 1) {
          return `${subString.join(' ')}...`
        } else {
          return `${bio}`
        }
      }
    }
    return ''
  }
  useEffect(() => {
    const loadData = async () => {
      const json = await GET(`/profiles/${id}`)
      if (json.data) {
        setProfile(json.data)
        window.scrollTo(0, 0)
      }
    }
    loadData()
  }, [])

  if (JSON.stringify(profile) === '{}') return <Loading />
  return (
    <div className='container'>
      <Header />
      <div className='mh-100 mt-80'>
        <div className='row'>
          <div className='col-10 start-2 col-xl-12 start-xl-1 breadcrumb'>
            <Link className='btn btn-link' to={Router.candidates}>
              Candidates
            </Link>
            <AiOutlineRight className='breadcrumb-icon' />
            <p>{profile.nickname ? profile.nickname : 'N/D'}</p>
          </div>

          <div className='col-12 row Candidate'>
            <div className='col-10 start-2 col-xl-12 start-xl-1 Candidate-container'>
              <div className='Candidate-video'>
                {profile?.video_url ? (
                  <ReactPlayer
                    width='100%'
                    height='100%'
                    url={profile?.video_url || '/images/videos/video.mp4'}
                    controls
                  />
                ) : (
                  <h3 className='Candidate-words'>"{showBio(profile.bio, 1)}"</h3>
                )}
              </div>
              <div className='Candidate-profile'>
                <div className='Candidate-profile-img'>
                  <img
                    src={profile.picture_url ? profile.picture_url : '/images/surrogate.png'}
                    alt={profile.nickname}
                  />
                  <div className='Candidate-profile-star'>
                    <FaStar />
                  </div>
                </div>
                <div className='Candidate-profile-section'>
                  <h2 className='title-4 mt-20 bold'>{profile.nickname}</h2>
                  <div className='Candidate-profile-info mt-20'>
                    <section>
                      <h3 className='address'>
                        {profile.city},
                        <br /> {profile.state}
                      </h3>
                      <h4>Location</h4>
                    </section>
                    <section>
                      <h3 className='age'>{profile.age}</h3>
                      <h4>Age</h4>
                    </section>
                  </div>
                  <button className='btn-primary mt-20'>SEND A MESSAGE</button>
                </div>
              </div>
            </div>
          </div>

          {state.user.profile.type_id == 1 && (
            <div className='col-8 start-3 col-xl-10 start-xl-2'>
              <div className='Candidate-badges'>
                {profile.obgyn_check && <div className='badge'>OBGYN Verified</div>}
                {profile.report_check && <div className='badge'>Verified Credit Record</div>}
              </div>
            </div>
          )}

          <p className='col-8 start-3 col-xl-10 start-xl-2 title-2 Candidate-bio'>
            {profile?.video_url ? '' : showBio(profile.bio, 2)}
          </p>

          {profile.type_id == 2 && (
            <div className='col-8 start-3 col-xl-10 start-xl-2 Candidate-questions'>
              <h2 className='title-5'>Surrogacy Survey</h2>
              <div className='row'>
                {[0, 1, 2, 3, 4, 5].map(item => (
                  <div key={item} className='col-6 col-xs-12'>
                    <h3 className='title-2'>Marital Status</h3>
                    <p>
                      A: At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis{' '}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Candidate
