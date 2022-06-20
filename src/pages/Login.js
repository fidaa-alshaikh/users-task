import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UrlPath = 'http://localhost/users-task/api/users/';

export default function Login() {

  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post(`${UrlPath}login-user.php`, inputs).then(function(response){
           if(response.data.status){
            console.log(response.data.message);
            navigate('/all-users');
           }else{
            console.log(response.data.message);
           }

         
      }).catch((err) => console.log(err));;
      
  }

  return (
    <div>
    <h1>Login user</h1>
    <form onSubmit={handleSubmit} method="POST">
        <table cellSpacing="10">
            <tbody>
                <tr>
                    <th>
                        <label>Email: </label>
                    </th>
                    <td> 
                        <input type="text" name="email" onChange={handleChange} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>Password: </label>
                    </th>
                    <td>
                        <input type="password" name="password" onChange={handleChange} />
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
