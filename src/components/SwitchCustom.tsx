import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Grid } from '@mui/material';

interface PropsType {
  handleSwitch?: any;
  switchValue: boolean;
  label: string;
  leftLabel?: string;
  className?: string;
}

export default function SwitchCustom(props: PropsType) {
  const { handleSwitch, switchValue, label, leftLabel, className } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleSwitch(!switchValue);
  };

  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      {leftLabel && <Grid item>{leftLabel}</Grid>}
      <Grid item>
        <Switch
          className={className}
          checked={switchValue}
          onChange={handleSwitch ? handleSwitch : handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
      <Grid item>{label}</Grid>
    </Grid>
  );
}