import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioCustom {
  handleChange?: any;
  placeholder: string;
  name: string;
  items: {value: string, valueKey: string | number}[];
  selectedItem: string | number;
}

export default function RadioCustom(props: RadioCustom) {
  const { placeholder, handleChange, items, name, selectedItem } = props;


  return (
    <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={selectedItem}
        onChange={handleChange}
    >
      {items.map((item) => (
        <FormControlLabel value={item.valueKey} control={<Radio />} label={item.value} />
      ))}
    </RadioGroup>
  );
}