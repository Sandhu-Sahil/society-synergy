import axios from 'axios';
import url from '../index'

export default async function GetHome() {
    const dataFromSomeAPI = await axios.get(`${url}/api/v1/home/leaderboard`)
    return (dataFromSomeAPI);
}