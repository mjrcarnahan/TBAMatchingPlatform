import React from 'react'
import Header from '../../components/Header'
import { AiOutlineStar } from 'react-icons/ai'
import './index.css'

const Profile = () => {
  return (
    <div className='container profile'>
      <Header />
      <div className='row mt-80'>
        <div className='col-10 start-2 mt-20'>
          <div className='row a-start'>
            <h3 className='col-12 title-2 bold'>
              Check all the info that we have on SurrogateForLove's Profile
            </h3>
            <div className='col-8 mt-20'>
              <div className='input-upload-container'>
                <label htmlFor='video' className='input-upload'>
                  <img src='/images/icons/video.svg' alt='' />
                  <p className='text-center title-1'>
                    <strong>Click here</strong> to upload your profile video
                  </p>
                  <input type='file' name='video' id='video' accept='video/*' />
                </label>
              </div>
              <div className='input-upload-container mt-40' style={{ paddingBottom: '20%' }}>
                <label htmlFor='file' className='input-upload'>
                  <p className='title-1'>
                    <strong>Click here</strong> upload OB - GYN Verified
                  </p>
                  <input type='file' name='file' id='file' accept='.pdf' />
                </label>
              </div>
              <p className='col-12 mt-20'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate totam at vitae
                laboriosam est voluptatum, exercitationem nobis veniam officiis unde necessitatibus
                molestias voluptates? Dolorem similique itaque dolorum blanditiis a. Quaerat.
              </p>
            </div>
            <div className='col-4 mt-20'>
              <div className='row profile-info text-center'>
                <div className='col-12 profile-image'>
                  <img src='/images/profile.png' alt='' />
                </div>
                <h2 className='col-12 title-2 bold mt-20'>SurrogateForLove</h2>
                <div className='col-8 start-4'>
                  <div className='row'>
                    <div className='col-12 row'>
                      <h3 className='col-3 flex j-end'>
                        <AiOutlineStar />
                      </h3>
                      <h3 className='col-9 text-left'>Miami, Florida</h3>
                    </div>
                    <div className='col-12 row'>
                      <h3 className='col-3 flex j-end'>
                        <AiOutlineStar />
                      </h3>
                      <h3 className='col-9 text-left'>Miami, Florida</h3>
                    </div>
                    <div className='col-12 row'>
                      <h3 className='col-3 flex j-end'>
                        <AiOutlineStar />
                      </h3>
                      <h3 className='col-9 text-left'>Miami, Florida</h3>
                    </div>
                  </div>
                </div>
                <button className='col-6 start-4 btn btn-primary mt-20'>Start the match</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
