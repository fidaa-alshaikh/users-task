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
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function AddUser() {

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
             values.gender? values.gender= values.gender : values.gender = null;
             values.city? values.city= values.city : values.city = null;
             values.country? values.country= values.country : values.country = null;

             await axios.post(`/add-user.php`, values).then(function(response){
              const message = response.data.message;
              const status = response.data.status;
                 if(status){
                  Swal.fire({
                    title: 'Success',
                    html: message,
                    confirmButtonText:"Ok",
                    focusConfirm: false,
                    icon: "success",
                  })
                   
                 }else{
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
           <UserInfo formik={formik} addUser/>
  )
}
