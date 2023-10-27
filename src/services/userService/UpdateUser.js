import axios from 'axios';
import url from '../index'

export default async function UpdateUser(data, token) {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
    const dataFromSomeAPI = await axios.post(`${url}/api/v2/user/updateUser`, data, config)
    return (dataFromSomeAPI);
}