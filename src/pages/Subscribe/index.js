import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import './index.css'

const Subscribe = () => (
  <div className='container'>
    <Header />
    <div className='row vh-100'>
      <form className='col-6 row a-strech'>
        <div className='col-10 start-2 row'>
          <h2 className='col-12 title-5 bold'>Hey! We are here to help you!</h2>
          <p className='col-12'>
            The Biggest Ask matching platform is meant to bring intended parents and surrogates
            together, as safely and efficiently as posible. Create your free account to get started.
          </p>
          <div className='col-12 mt-10'></div>
          <input name='first_name' type='text' className='col-6' placeholder='First Name' />
          <input name='middle_name' type='text' className='col-6' placeholder='Middle Name' />
          <input name='last_name' type='text' className='col-6' placeholder='Last Name' />
          <input
            name='maiden_name'
            type='text'
            className='col-6'
            placeholder='Maiden Name (if applicable)'
          />
          <select name='sex' className='col-6'>
            <option value=''>Sex</option>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
          </select>
          <input name='birth' type='date' className='col-6' placeholder='Date of Birth' />
          <input name='email' type='email' className='col-12' placeholder='Email' />
          <input type='password' name='password' className='col-6' placeholder='Password' />
          <input
            type='password'
            name='confirm_password'
            className='col-6'
            placeholder='Confirm Password'
          />

          <div className='col-12 text-center'>
            <a className='btn-link' href='/#'>
              Why do I need to register at TBA?
            </a>
          </div>
          <div className='col-12 flex j-between'>
            <Link to='/' className='btn-link'>
              Back
            </Link>
            <Link to='/form/code' className='btn-primary'>
              NEXT
            </Link>
          </div>
        </div>
      </form>
      <div className='col-6 row' style={{ background: '#F6F6F6' }}>
        <h2 className='col-12 title-2 bold'>
          Why getting pro subscription is the best option for you?
        </h2>
        <p className='col-12'>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
          est laborum et dolorum fuga.
        </p>
        <h2 className='col-12 title-2 bold'>What are you paying for?</h2>
        <p className='col-12'>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
          est laborum et dolorum fuga.
        </p>
        <ul className='col-12'>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          </li>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          </li>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          </li>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          </li>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default Subscribe
