import axios from 'axios';
import url from '../index'

export default async function OtpSendByEmailApi(data) {
    const dataFromSomeAPI = await axios.post(`${url}/api/v1/user/otpsendemail`, data)
    return (dataFromSomeAPI);
}