import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../components/Navbar';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer'
import { Grid } from '@mui/material';

const MainLayout = (props: any) => {

  return (
    <Grid container minHeight="100vh">
      <Grid item container xs={12}>
        <Navbar />
      </Grid>
      <Grid item container xs={12} display="flex" flexDirection="column" justifyContent="end">
        <Footer />      
      </Grid>
    </Grid>
  );
}

MainLayout.propTypes = {
  proCodigo: PropTypes.string,
}

export default MainLayout;
