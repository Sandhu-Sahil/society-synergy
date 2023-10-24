import axios from 'axios';
import url from '../index'

export default async function GetUser(id, token) {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
    };
    const dataFromSomeAPI = await axios.get(`${url}/api/v2/user/` + id, config)
    return (dataFromSomeAPI);
}