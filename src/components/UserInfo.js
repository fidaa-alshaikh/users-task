import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "../services/axios.js";
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
        value: undefined,
        label: '',
    }
];

export default function UserInfo(props) {
    const { formik, addUser, getCityId, inputs } = props;
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);



    useEffect(() => {
        axios.get(`/addresses/country.php`).then((response) => {
            setCountries(response.data.countries);

        }).catch((err) => console.log(err));
        const country_id = inputs?.country_id
        const state_id = inputs?.state_id

        if (formik.values.country !== '' || formik.values.state !== '') {
            axios.get(`/addresses/state.php/${country_id}`).then((response) => {
                setStates(response.data.states);


            }).catch((err) => console.log(err));

            axios.get(`/addresses/city.php/${state_id}`).then((response) => {
                setCities(response.data.cities);


            }).catch((err) => console.log(err));


        }


    }, [
        inputs,
        formik.values.country,
        formik.values.state
    ])



    const getStates = event => {
        const { countryId } = event.currentTarget.dataset;
        axios.get(`/addresses/state.php/${countryId}`).then((response) => {
            setStates(response.data.states);

        }).catch((err) => console.log(err));
        formik.setFieldValue('state_name', "");
    }

    const getCities = event => {
        const { stateId } = event.currentTarget.dataset;
        axios.get(`/addresses/city.php/${stateId}`).then((response) => {
            setCities(response.data.cities);

        }).catch((err) => console.log(err));
        formik.setFieldValue('city_name', "");
    }


    return (

        <Container component="main" maxWidth="md">

                <Box component='form' onSubmit={formik.handleSubmit} sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom component="div" sx={{
                        marginTop: 8,
                        marginBottom: 4,

                    }}>
                        ✨ {addUser ? "Add User" : "Edit User"}

                    </Typography>
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',

                    }}>



                        <Grid item xs={12} sm={addUser ? 6 : 12} >
                            <TextField

                                name="full_name"
                                required
                                fullWidth
                                id="full_name"
                                label="Full Name"
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
                                disabled={addUser ? false : true}
                                value={formik.values.email || ''}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        {addUser ?
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            :
                            <></>}
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ minWidth: "100%" }}>
                                <InputLabel >Gender</InputLabel>
                                <Select
                                    name="gender"
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
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ minWidth: "100%" }}>
                                <InputLabel >Country *</InputLabel>
                                <Select
                                    name="country_name"
                                    fullWidth
                                    id="country_name"
                                    label="Country *"
                                    value={formik.values.country_name || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.country_name && Boolean(formik.errors.country_name)}
                                   // helpertext={formik.touched.country_name && formik.errors.country_name}
                                    
                                >
                                    {countries.map((option, key) => (
                                        <MenuItem key={key} value={option.country_name}
                                            data-country-id={option.country_id}
                                            onClick={getStates}
                                        >
                                            {option.country_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{formik.touched.country_name && formik.errors.country_name}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ minWidth: "100%" }}>
                            <InputLabel >State *</InputLabel>
                                <Select
                                name="state_name"
                                fullWidth
                                id="state_name"
                                label="State *"
                                value={formik.values.state_name || ''}
                                onChange={formik.handleChange}
                                error={formik.touched.state_name && Boolean(formik.errors.state_name)}
                                //helpertext={formik.touched.state_name && formik.errors.state_name}
                                
                            >
                                {states?.map((option, key) => (
                                    <MenuItem key={key} value={option.state_name}
                                        data-state-id={option.state_id}
                                        onClick={getCities}
                                    >
                                        {option.state_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.state_name && formik.errors.state_name}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ minWidth: "100%" }}>
                                <InputLabel >City *</InputLabel>
                               
                                <Select
                                    name="city_name"
                                    fullWidth
                                    id="city_name"
                                    label="City *"
                                    value={formik.values.city_name || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.city_name && Boolean(formik.errors.city_name)}
                                    // helpertext={formik.touched.city_name && formik.errors.city_name}
                                    
                                >
                                     {cities &&
                                    cities?.map((option, key) => (
                                        <MenuItem key={key} value={option.city_name}
                                            data-city-id={option.city_id}
                                            onClick={(event) => { getCityId(event) }}
                                        >
                                            {option.city_name}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                                <FormHelperText>{formik.touched.city_name && formik.errors.city_name}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                name="street"
                                fullWidth
                                id="street"
                                label="Street"
                                value={formik.values.street || ''}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {addUser ? "Add" : "Edit"}
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            

        </Container>
    )
}
