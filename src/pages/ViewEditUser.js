
import React, { useEffect, useState } from 'react';
import axios from "../services/axios.js";
import { useParams } from 'react-router-dom';


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


export default function ViewEditUser(props) {

    const {userId} = props;
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        axios.get(`/edit-user.php/${userId??id}`).then((response) => {
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


    return (

            <UserInfo formik={formik} />

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
