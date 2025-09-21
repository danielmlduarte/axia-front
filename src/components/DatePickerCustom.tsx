import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // ⬅️ importa o locale
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

dayjs.locale('pt-br'); // ⬅️ define o locale globalmente

interface DatePickerCustomProps {
  handleChange?: any;
  handleBlurChange?: any;
  placeholder?: string;
  controlledValue?: string | number;
  name?: string;
  type?: string;
  isValid?: boolean;
  readOnly?: boolean;
}

export default function DatePickerCustom(props: DatePickerCustomProps) {
  const {
    placeholder,
    handleChange,
    controlledValue,
    name,
    isValid = true,
    readOnly = false
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className='input-custom'
        label=""
        inputFormat="DD/MM/YYYY"
        value={controlledValue}
        onChange={handleChange}
        renderInput={(params) => {
          return <TextField {...params}/>
        }}
      />
    </LocalizationProvider>
  );
}
