import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../services/axios.js";
import AuthContext from '../contexts/AuthProvider.js';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../assets/css/style.module.css';

//Formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import Copyright from '../components/Copyright.js';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});




const theme = createTheme();

export default function Login(props) {
  const { setAuth } = useContext(AuthContext); // set auth state and store it in auth in AuthProvider file
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios.post(`/login-user.php`, values).then(function (response) {
        const status = response.data.status;
        const message = response.data.message;
        const accessToken = response?.data?.access_token;
        if (status && accessToken) {
          //setAuth(...inputs, {accessToken});
          localStorage.setItem("jwtToken", accessToken);
          // setAuth({accessToken});
          props.loginCallback();
          navigate('/');
        } else {
           Swal.fire({
            title: 'Error login 😔',
            html: message,
            confirmButtonText:"Ok",
            focusConfirm: false,
            icon: "error",
          });
        }


      }).catch((err) => console.log(err));;
    },
  });


  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email || ''}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password || ''}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink className={styles.link} to='/register'> {"Don't have an account? Sign Up"}</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }}/>
      </Container>
    </ThemeProvider>
  )
}
