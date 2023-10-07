import axios from 'axios';

export default async function LoginAxios(data) {
    const dataFromSomeAPI = await axios.post(`http://localhost:3003/api/v1/user/login`, data)
    return (dataFromSomeAPI);
}