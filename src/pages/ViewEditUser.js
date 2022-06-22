
import React, { useEffect, useState } from 'react';
import axios from "../services/axios.js";
import { useParams } from 'react-router-dom';

export default function ViewEditUser() {
  

  const {id} = useParams();

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    // axios.post(`${UrlPath}edit-user.php/${id}`, {"id":id}).then((response) => {
    // //   setInputs(response.data.user);
    // console.log(response.data);

    // }).catch((err) => console.log(err));

    axios.get(`/edit-user.php/${id}`).then((response) => {
        setInputs(response.data.user);
    
        }).catch((err) => console.log(err));
  },[])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`/edit-user.php`,inputs).then((response) => {

      if(response.data.status){
        console.log(response.data.message);
        // navigate('/');
       }else{
        console.log(response.data.message);
       }
    }).catch((err) => console.log(err));
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
