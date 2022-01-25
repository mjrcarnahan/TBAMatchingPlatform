import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { states } from '../../utils/constants'
import './index.css'

export default function SelectState({ className = '', onChange, value = '' }) {
  const statesOptions = [...states.map(state => state.description)]

  return (
    <Autocomplete
      className={`SelectState ${className}`}
      options={statesOptions}
      getOptionLabel={option => option}
      onChange={onChange}
      value={value}
      renderInput={params => (
        <TextField {...params} placeholder='Select State' variant='outlined' />
      )}
    />
  )
}
