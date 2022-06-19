import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
const UrlPath = 'http://localhost/users-task/api/users/';
export default function AllUsers() {

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get(`${UrlPath}view-users.php`).then((response) => {
      setUsers(response.data.users);
      setStatus(response.data.status);
    })
  }, [])

  return (

    <div>
      <h1>List Users</h1>
      <table>
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
                  <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                            {/* <button onClick={() => deleteUser(user.id)}>Delete</button> */}
                </td>
              </tr>
            )}

          </tbody>
          :
          <h3>No data</h3>}

      </table>
    </div>
  )
}
