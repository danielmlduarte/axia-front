import { Grid } from '@mui/material'
import React from 'react'

function Error404() {
  return (
    <Grid item display="flex" justifyContent="center" alignItems="center" margin="auto" direction="column" fontSize="36px">
      <span className='c-s-verde'>{"<404 />"}</span>
      <span className='c-s-verde'>Página não encontrada!!</span>
      <span className='c-s-verde'>Possivelmente você está tentando acessar um conteúdo que não existe.</span>
    </Grid>
  )
}

export default Error404
