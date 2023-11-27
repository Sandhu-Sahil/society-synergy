import axios from 'axios';
import url from '../index'

export default async function GetEvent(id) {
    const dataFromSomeAPI = await axios.get(`${url}/api/v1/event/${id}`)
    return (dataFromSomeAPI);
}