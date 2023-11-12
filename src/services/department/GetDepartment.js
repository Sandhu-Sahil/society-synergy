import axios from 'axios';
import url from '../index'

export default async function GetDepartment(id) {
    const dataFromSomeAPI = await axios.get(`${url}/api/v1/department/${id}`)
    return (dataFromSomeAPI);
}