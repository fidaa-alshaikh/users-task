import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const UrlPath = 'http://localhost/users-task/api/users/';

export default function ViewEditUser() {
  

  const {id} = useParams();

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    axios.post(`${UrlPath}edit-user.php`, {"id":id}).then((response) => {
      setInputs(response.data.user);

    }).catch((err) => console.log(err));
  },[])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleSubmit = (event) => {
    event.preventDefault();
console.log(inputs);
    axios.put(`${UrlPath}edit-user.php`,inputs).then((response) => {

      if(response.data.status){
        console.log(response.data.message);
        // navigate('/');
       }else{
        console.log(response.data.message);
       }
    })  
}

  return (
    <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input value={inputs.full_name} type="text" name="full_name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td> 
                                <input value={inputs.email} type="text" name="email" onChange={handleChange} disabled/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Gender: </label>
                            </th>
                            <td>
                                <input value={inputs.gender} type="text" name="gender" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>City: </label>
                            </th>
                            <td>
                                <input value={inputs.city} type="text" name="city" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Country: </label>
                            </th>
                            <td>
                                <input value={inputs.country} type="text" name="country" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
  )
}
