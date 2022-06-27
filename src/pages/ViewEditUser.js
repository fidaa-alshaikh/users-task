
import React, { useEffect, useState } from 'react';
import axios from "../services/axios.js";
import { useParams } from 'react-router-dom';
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
import UserInfo from '../components/UserInfo.js';

const validationSchema = yup.object({
    full_name: yup
        .string('Enter your name')
        .required('Name is required'),
});

const validationSchema2 = yup.object({
    'newPassword': yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});


export default function ViewEditUser() {


    const { id } = useParams();
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        axios.get(`/edit-user.php/${id}`).then((response) => {
            setInputs(response.data.user);

        }).catch((err) => console.log(err));
    }, [])

    //EDIT USER
    const formik = useFormik({
            initialValues: inputs,
            enableReinitialize: true,
            validationSchema: validationSchema,
            onSubmit: async (values) => {

                await axios.put(`/edit-user.php`, values).then((response) => {

                    const message = response.data.message;
                    const status = response.data.status;
                    if (status) {
                        Swal.fire({
                            title: 'Success',
                            html: message,
                            confirmButtonText: "Ok",
                            focusConfirm: false,
                            icon: "success",
                        })
                    } else {
                        Swal.fire({
                            title: 'Error',
                            html: message,
                            confirmButtonText: "Ok",
                            focusConfirm: false,
                            icon: "error",
                        })
                    }
                }).catch((err) => console.log(err));
            }
        })

        //CHANGE PASSWORD
        const formik2 = useFormik(
            {
                initialValues: {},
                validationSchema: validationSchema2,
                onSubmit: async (values) => {

                    values.id = id;
                    await axios.post(`/change-password.php`, values).then((response) => {
    
                        const message = response.data.message;
                        const status = response.data.status;

                        if (status) {
                            Swal.fire({
                                title: 'Success',
                                html: message,
                                confirmButtonText: "Ok",
                                focusConfirm: false,
                                icon: "success",
                            })
                        } else {
                            Swal.fire({
                                title: 'Error',
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
            <UserInfo formik={formik} />


            <Container component="main" maxWidth="md">
                <Box component='form' onSubmit={formik2.handleSubmit} sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom component="div" sx={{
                        marginTop: 8,
                        marginBottom: 4,

                    }}>
                        Change Password
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
                                    value={formik2.values.currentPassword || ''}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.currentPassword && Boolean(formik2.errors.currentPassword)}
                                    helperText={formik2.touched.currentPassword && formik2.errors.currentPassword}
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
                                    value={formik2.values.newPassword || ''}
                                    onChange={formik2.handleChange}
                                    error={formik2.touched.newPassword && Boolean(formik2.errors.newPassword)}
                                    helperText={formik2.touched.newPassword && formik2.errors.newPassword}
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
        //////////// NORMAL INPUTS
        // <div>
        //         <h1>Edit user</h1>
        //         <form onSubmit={handleSubmit}>
        //             <table cellSpacing="10">
        //                 <tbody>
        //                     <tr>
        //                         <th>
        //                             <label>Name: </label>
        //                         </th>
        //                         <td>
        //                             <input value={inputs.full_name} type="text" name="full_name" onChange={handleChange} />
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <th>
        //                             <label>Email: </label>
        //                         </th>
        //                         <td> 
        //                             <input value={inputs.email} type="text" name="email" onChange={handleChange} disabled/>
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <th>
        //                             <label>Gender: </label>
        //                         </th>
        //                         <td>
        //                             <input value={inputs.gender} type="text" name="gender" onChange={handleChange} />
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <th>
        //                             <label>City: </label>
        //                         </th>
        //                         <td>
        //                             <input value={inputs.city} type="text" name="city" onChange={handleChange} />
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <th>
        //                             <label>Country: </label>
        //                         </th>
        //                         <td>
        //                             <input value={inputs.country} type="text" name="country" onChange={handleChange} />
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <td colSpan="2" align ="right">
        //                             <button>Save</button>
        //                         </td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </form>
        //     </div>
    )
}
