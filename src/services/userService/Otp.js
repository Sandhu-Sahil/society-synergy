import axios from 'axios';
import url from '../index'

export default async function OtpApi(data) {
    const dataFromSomeAPI = await axios.post(`${url}/api/v1/user/otpverifyemail`, data)
    return (dataFromSomeAPI);
}