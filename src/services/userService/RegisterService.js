import axios from 'axios';
import url from '../index'

export default async function LoginAxios(data) {
    const dataFromSomeAPI = await axios.post(`${url}/api/v1/user/register`, data)
    return (dataFromSomeAPI);
}