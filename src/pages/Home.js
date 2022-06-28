import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{
          marginTop: 10,
          marginBottom: 4,
          margin: '40% 0',
          textAlign: 'center',

        }} >

        <Typography variant="h4" gutterBottom component="div" >
          WELCOME TO FIDAA WEBSITE 🥰!
        </Typography>
        <Typography variant="h4" gutterBottom component="div">
          <Link to={`all-users`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" endIcon={ <ArrowForwardIcon />}>
            View users
          </Button>
          </Link>
        </Typography>




      </Box>
    </Container>
  )
}
