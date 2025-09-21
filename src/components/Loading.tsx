import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

interface LoadingProps {
  setHeight?: string
}

export default function Loading(props: LoadingProps) {
  const { setHeight } = props
  return (
    <Grid container item display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={setHeight ? setHeight : "100%"}>
      <Grid item mt={10} mb={2}>
        <CircularProgress />
      </Grid>
      <Grid>
        <span>Carregando...</span>
      </Grid>
    </Grid>
  );
}