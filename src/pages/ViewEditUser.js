
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

//Formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";

const validationSchema = yup.object({
    full_name: yup
        .string('Enter your name')
        .required('Name is required'),
});

const genders = [
    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    },
    {
        value: 'Not to say',
        label: 'Prefer not to say',
    },
    {
        value:  undefined,
        label: '',
    }
];

const countries = [
    {
        value: 'Saudi Arabia',
        label: 'Saudi Arabia',
    },
    {
        value:  undefined,
        label: '',
    }
];

const cities = [
    {
        value: 'Alhassa',
        label: 'Alhassa',
    },
    {
        value: 'Riyadh',
        label: 'Riyadh',
    },
    {
        value: 'Jeddah',
        label: 'Jeddah',
    },
    {
        value:  undefined,
        label: '',
    }
];


export default function ViewEditUser(props) {


    const { id } = useParams();
     const [inputs, setInputs] = useState([]);

    useEffect(() => {
        axios.get(`/edit-user.php/${id}`).then((response) => {
            setInputs(response.data.user);

        }).catch((err) => console.log(err));
    }, [])

    const formik = useFormik(
        {
        initialValues: inputs,
        enableReinitialize:true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            await axios.put(`/edit-user.php`, values).then((response) => {

                const message = response.data.message;
                const status = response.data.status;
                if (status) {
                    Swal.fire({
                    title: 'Success',
                    html: message,
                    confirmButtonText:"Ok",
                    focusConfirm: false,
                    icon: "success",
                  })
                } else {
                    Swal.fire({
                    title: 'Error',
                    html: message,
                    confirmButtonText:"Ok",
                    focusConfirm: false,
                    icon: "error",
                  })
                }
            }).catch((err) => console.log(err));
        }
        
    })


    return (
        <Container component="main" maxWidth="md">
            <Box component='form' onSubmit={formik.handleSubmit} sx={{ flexGrow: 1 }}>

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
                            value={formik.values.full_name || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                            helperText={formik.touched.full_name && formik.errors.full_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            autoFocus
                            disabled
                            value={formik.values.email || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            name="gender"
                            select
                            fullWidth
                            id="gender"
                            label="Gender"
                            value={formik.values.gender || ''}
                            onChange={formik.handleChange}
                        >
                            {genders.map((option, key) => (
                                <MenuItem key={key} value={option.value}>
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
                            value={formik.values.country || ''}
                            onChange={formik.handleChange}
                        >
                            {countries.map((option, key) => (
                                <MenuItem key={key} value={option.value}>
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
                            value={formik.values.city || ''}
                            onChange={formik.handleChange}
                        >
                            {cities.map((option, key) => (
                                <MenuItem key={key} value={option.value}>
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
                            Edit
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Container>


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
