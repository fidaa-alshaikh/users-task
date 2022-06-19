import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const UrlPath = 'http://localhost/users-task/api/users/';

export default function ViewEditUser() {
  

  const {id} = useParams();

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    axios.get(`${UrlPath}edit-user.php/${id}`).then((response) => {

    })
  },[])

  return (
    <div>ViewEditUser</div>
  )
}
