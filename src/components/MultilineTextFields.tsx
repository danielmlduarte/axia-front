import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface MultilineTextFieldsProps {
  width?: string,
  placeholder?: string,
  maxRows?: number,
  handleChange: any,
  controlledValue: string,
  maxLength?: number,
  name: string
};

export default function MultilineTextFields(props: MultilineTextFieldsProps) {
  const { width, placeholder, maxRows, handleChange, controlledValue, maxLength = 200, name } = props;

  return (
    <TextField
      className="textarea-custom"
      id="outlined-multiline-flexible"
      multiline
      inputProps={{ maxLength: maxLength }}
      value={controlledValue}
      placeholder={placeholder ? placeholder : ""}
      onChange={handleChange}
      maxRows={maxRows ? maxRows : 4}
      name={name}
    />
  );
}
