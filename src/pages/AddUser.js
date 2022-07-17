import React, {useState} from 'react';
import axios from "../services/axios.js";
import { useNavigate } from 'react-router-dom';

//Formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import UserInfo from '../components/UserInfo.js';



export default function AddUser() {
  const navigate = useNavigate();
  const [cityId, setCityId] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  
let validationSchema = "";

validationSchema = yup.object({
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
    // CHECK REGISTER
  country_name: yup.string().required('Country is required'),
  state_name: yup.string().required('State is required'),
  city_name: yup.string().required('City is required'),
});


  function getCityId(event){
    const { cityId } = event.currentTarget.dataset;
    setCityId(cityId)
  }

  const formik = useFormik({
    initialValues: {
      country_name: "",
      state_name:"",
      city_name:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
              if(selectedImage){
                values.imageUrl = selectedImage[0].data_url;
              }
              values.city_id = cityId;
             // eslint-disable-next-line
             values.gender? values.gender= values.gender : values.gender = null;
             // eslint-disable-next-line
             values.street? values.street= values.street : values.street = null;

             await axios.post(`users/add-user.php`, values).then(function(response){
              console.log(response)
              const message = response.data.message;
              const status = response.data.status;
                 if(status){
                  Swal.fire({
                    title: 'Success 👍',
                    html: message,
                    confirmButtonText:"Ok",
                    focusConfirm: false,
                    icon: "success",
                  }).then(() => {
                    navigate('/all-users');
                  })
                   
                 }else{
                  Swal.fire({
                    title: 'Error 😔',
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
           <UserInfo formik={formik} addUser getCityId={getCityId} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
  )
}
