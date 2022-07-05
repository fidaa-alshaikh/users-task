import React, { useContext } from 'react';
import axios from "../services/axios.js";
import AuthContext from '../contexts/AuthProvider.js';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//Formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import ViewEditUser from './ViewEditUser.js';

const validationSchema = yup.object({
  'newPassword': yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});


export default function MyProfile() {

  const { auth } = useContext(AuthContext);

  //CHANGE PASSWORD
  const formik = useFormik(
    {
      initialValues: {},
      validationSchema: validationSchema,
      onSubmit: async (values) => {

        values.id = auth.currentUser.id;
        await axios.post(`users/change-password.php`, values).then((response) => {

          const message = response.data.message;
          const status = response.data.status;

          if (status) {
            Swal.fire({
              title: 'Success 👍',
              html: message,
              confirmButtonText: "Ok",
              focusConfirm: false,
              icon: "success",
            })
          } else {
            Swal.fire({
              title: 'Error 😔',
              html: message,
              confirmButtonText: "Ok",
              focusConfirm: false,
              icon: "error",
            })
          }
        }).catch((err) => console.log(err));
      }
    })


  return (
    <>

    <ViewEditUser userId={auth.currentUser.id} />

    <Container component="main" maxWidth="md">
                <Box component='form' onSubmit={formik.handleSubmit} sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom component="div" sx={{
                        marginTop: 4,
                        marginBottom: 4,

                    }}>
                       ✨ Change Password
                    </Typography>
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',

                    }}>


                        <Grid item xs={12} sm={4} >
                                <TextField
                                    required
                                    fullWidth
                                    name="currentPassword"
                                    label="Current Password"
                                    type="password"
                                    id="currentPassword"
                                    value={formik.values.currentPassword || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                />
                            </Grid>
                        <Grid item xs={12} sm={4} >
                                <TextField
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    id="newPassword"
                                    value={formik.values.newPassword || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                            </Grid>
                        <Grid item xs={12} sm={4} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ pt: 1.5, pb: 1.5 }}
                            >
                               Change 
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Container>



    </>

  )
}
