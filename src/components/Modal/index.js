import React from 'react'
import { IoMdClose } from 'react-icons/io'
import './index.css'

const Modal = ({ open, body, close }) => {
  if (!open) return null

  return (
    <div className='modal'>
      <div className='modal-dialog'>
        <IoMdClose onClick={close} className='modal-close' />
        {body && <div className='modal-body'>{body}</div>}
      </div>
    </div>
  )
}

export default Modal
