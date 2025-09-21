import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface PropsType {
  handleConsiderarDescartados?: any;
  considerarDescartados: boolean;
  label: string;
}

export default function ControlledCheckbox(props: PropsType) {
  const { handleConsiderarDescartados, considerarDescartados, label } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleConsiderarDescartados(!considerarDescartados)
  };

  return (
    <FormGroup>
      <FormControlLabel control={
        <Checkbox
        checked={considerarDescartados}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />}
      label={label} />
    </FormGroup>
  );
}