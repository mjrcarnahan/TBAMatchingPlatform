import 'date-fns'
import React, { useState } from 'react'

import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import './index.css'

const Datepicker = ({ className, name, value, placeholder, onChange, required = false }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={`${className} datepicker`}
        placeholder={placeholder}
        value={selectedDate ? selectedDate : null}
        onChange={date => {
          setSelectedDate(date)
          if (date) {
            const newDate = `${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)
              .toString()
              .padStart(2, 0)}-${new Date(date).getDate().toString().padStart(2, 0)}`
            onChange({ target: { name: name, value: newDate } })
          } else {
            onChange({ target: { name: name, value: null } })
          }
        }}
        maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}
        format='MM/dd/yyyy'
        InputProps={{
          disableUnderline: true,
          inputProps: {
            style: { padding: 0 },
          },
        }}
        required={required}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Datepicker
