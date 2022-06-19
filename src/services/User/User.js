
import axios from "axios";
const UrlPath = 'http://localhost/users-task/api/users/';

export async function createUser(inputs){

    const response = await axios.post(`${UrlPath}add-user.php`, inputs);
    console.log(response.data);
    return response.data;

}