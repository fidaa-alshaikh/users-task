import React, { useEffect, useState, useContext } from 'react'
import axios from "../services/axios.js";
import { Link } from "react-router-dom";
import AuthContext from '../contexts/AuthProvider.js';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";

function createData(key, id, full_name, email, gender, city, country) {
  return { key, id, full_name, email, gender, city, country };
}


export default function AllUsers() {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);

  function getAllUsers() {
    axios.get(`/view-users.php`).then((response) => {
      setUsers(response.data.users);
      setStatus(response.data.status);
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  function deleteUser(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-user.php`, { data: { id: id } }).then((response) => {
          getAllUsers();
          Swal.fire(
            'Deleted!',
            '',
            'success'
          )
    
        }).catch((err) => console.log(err));


      }
    })

  }

  const rows = users?.map((user, key) => createData(key, user.id, user.full_name, user.email, user.gender, user.city, user.country));

  return (

    <Container component="main" maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom component="div" sx={{
          marginTop: 8,
          marginBottom: 4,

        }}>
          List of Users
        </Typography>
        <Grid container spacing={2} sx={{
          alignItems: 'center',

        }}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">City</TableCell>
                  <TableCell align="left">Country</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {status ?
                  rows.map((row, key) => (
                    <TableRow
                      key={row.full_name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell component="th" scope="row">
                        {key +1}
                      </TableCell>
                      <TableCell align="left">{row.full_name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.gender?? '-'}</TableCell>
                      <TableCell align="left">{row.city?? '-'}</TableCell>
                      <TableCell align="left">{row.country?? '-'}</TableCell>
                      <TableCell >
                        <Stack direction="row" spacing={1}>
                        <Link to={`user/${row.id}/edit`} style={{ marginRight: "10px" }}>
                          <IconButton aria-label="edit" color="primary">
                            <EditIcon >  
                            </EditIcon>
                          </IconButton>
                          </Link>
                          <IconButton aria-label="delete" color="error" onClick={() => deleteUser(row.id)}>
                            <DeleteIcon/>
                          </IconButton>
                        </Stack>
                        </TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow>
                  <TableCell>No data</TableCell>
                  </TableRow>
               
                }
              </TableBody>
            </Table>
          </TableContainer>
          {/* NORMAL TABLE */}
          {/* <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            {status ?
              <tbody>
                {users.map((user, key) =>
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>Edit</Link>
                      <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                )}

              </tbody>
              :
              <h3>No data</h3>}

          </table> */}


        </Grid>

      </Box>
    </Container>


  )
}
