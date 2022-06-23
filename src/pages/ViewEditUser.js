
import React, { useEffect, useState } from 'react';
import axios from "../services/axios.js";
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';

//Formik
// import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";

// const validationSchema = yup.object({
//     full_name: yup
//         .string('Enter your name')
//         .required('Name is required'),
//     email: yup
//         .string('Enter your email')
//         .email('Enter a valid email')
//         .required('Email is required'),
//     password: yup
//         .string('Enter your password')
//         .min(8, 'Password should be of minimum 8 characters length')
//         .required('Password is required'),
// });


const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];


export default function ViewEditUser(props) {


    const { id } = useParams();
    //const {inputs} = props;
    const [dataLoading, setDataLoading] = useState(false)
     const [inputs, setInputs] = useState([]);

    useEffect(() => {
        // axios.post(`${UrlPath}edit-user.php/${id}`, {"id":id}).then((response) => {
        // //   setInputs(response.data.user);
        // console.log(response.data);

        // }).catch((err) => console.log(err));

        axios.get(`/edit-user.php/${id}`).then((response) => {
            setInputs(response.data.user);

        }).catch((err) => console.log(err));
        setDataLoading(true);
    }, [])

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({ ...values, [name]: value }));
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`/edit-user.php`, inputs).then((response) => {

            if (response.data.status) {
                console.log(response.data.message);
                // navigate('/');
            } else {
                console.log(response.data.message);
            }
        }).catch((err) => console.log(err));
    }



    // const formik = useFormik(
    //     {
    //     initialValues: inputs,
    //     validationSchema: {},
    //     onSubmit: async (values) => {
    //         //  await axios.post(`/add-user.php`, values).then(function(response){
    //         //   const message = response.data.message;
    //         //   const status = response.data.status;
    //         //      if(status){
    //         //       Swal.fire({
    //         //         title: 'Success Registration',
    //         //         html: message,
    //         //         confirmButtonText:"Ok",
    //         //         focusConfirm: false,
    //         //         icon: "success",
    //         //       }).then(() => {
    //         //         navigate('/login');}
    //         //       )

    //         //      }else{
    //         //       Swal.fire({
    //         //         title: 'Error Registration',
    //         //         html: message,
    //         //         confirmButtonText:"Ok",
    //         //         focusConfirm: false,
    //         //         icon: "error",
    //         //       })
    //         //      }


    //         // }).catch((err) => console.log(err));;
    //     }
        
    // })


    return (
        <Container component="main" maxWidth="md">
           <Formik
                                    initialValues={inputs}
                                    validationSchema=""
                                    onSubmit={async (values, actions) => {
                                        // setSubmitting(true);
                                        // await auth()
                                        //     .sendPasswordResetEmail(values.email)
                                        //     .then(async () => {
                                        //         setLogin(false);
                                        //         await Swal.fire({
                                        //             title: t('common.success'),
                                        //             html: '',
                                        //             confirmButtonText: t('common.ok'),
                                        //             focusConfirm: false,
                                        //             icon: 'success',
                                        //         });
                                        //     })
                                        //     .catch(async (error) => {
                                        //         await Swal.fire({
                                        //             title: t('common.error'),
                                        //             html: t('errors.emailNotFound'),
                                        //             confirmButtonText: t('common.ok'),
                                        //             focusConfirm: false,
                                        //             icon: 'error',
                                        //         });
                                        //     });
                                        // setSubmitting(false);
                                        // actions.setSubmitting(false);
                                    }}
                                >
                                    {({ values, isSubmitting, errors, touched, handleSubmit, handleChange }) => (
            <Box component='form' onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>

                <Grid container spacing={2} sx={{
                    marginTop: 8,
                    alignItems: 'center',

                }}>
                    <Grid item xs={12} sm={12} >
                        <TextField
                           
                            name="full_name"
                            required
                            fullWidth
                            id="full_name"
                            label="Full Name"
                            autoFocus
                            value={values.full_name}
                            onChange={handleChange}
                            error={touched.full_name && Boolean(errors.full_name)}
                            helperText={touched.full_name && errors.full_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            
                            name="email"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            name="gender"
                            select
                            fullWidth
                            id="gender"
                            label="Gender"
                            value={values.gender}
                            onChange={handleChange}
                        // error={touched.gender && Boolean(errors.gender)}
                        // helperText={touched.gender && errors.gender}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            name="city"
                            select
                            fullWidth
                            id="city"
                            label="City"
                            value={values.city}
                            onChange={handleChange}
                        // error={touched.city && Boolean(errors.city)}
                        // helperText={touched.city && errors.city}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            name="country"
                            select
                            fullWidth
                            id="country"
                            label="Country"
                            value={values.country}
                            onChange={handleChange}
                        // error={touched.country && Boolean(errors.country)}
                        // helperText={touched.country && errors.country}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>

            </Box>
            )}
            </Formik> 
        </Container>


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
