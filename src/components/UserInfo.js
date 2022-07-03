import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

const countries = [
    {
        value: 'Saudi Arabia',
        label: 'Saudi Arabia',
    },
    {
        value: undefined,
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
        value: undefined,
        label: '',
    }
];

export default function UserInfo(props) {
    const { formik, addUser } = props;
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
                            name="state"
                            select
                            fullWidth
                            id="state"
                            label="State"
                            value={formik.values.state || ''}
                            onChange={formik.handleChange}
                        >
                            {cities.map((option, key) => (
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
