import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button } from '@mui/material';
import styles from './user.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import OtpApi from '@/services/userService/Otp';

toast.configure();
export default function Otp(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        email: cookies.SandhuOtpEmail,
        otp: '',
    })
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('required*').length(8, 'OTP length should be 8'),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, onsubmitProps) => {
            handleSubmit(values);
        },
        enableReinitialize: true
    })
    const handleSubmit = async (values) => {    
        const res = await OtpApi(values)
          .then((res) => {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            setCookie('jwtSandhuToken', res.data.data.token, { path: '/' })
            router.push('/profile');
          })
          .catch((error) => {
            toast.error(error.response?.data?.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
          });    
    }
    return(
        <>
        <div className={styles.outtermain}>
            <div className={styles.outterBox}>
                <div className={styles.loginHeading}>
                    <h1 style={{textAlign:'center'}}>Enter OTP</h1>
                    <p style={{textAlign:'center'}}>Check your email for the OTP</p>
                </div>
                <div className={styles.innerBox}>
                    <div className={styles.loginData}>
                        <form autoComplete="off" onSubmit={formik.handleSubmit} className={styles.inputLoginForm}>
                            <TextField                     
                                required 
                                id="standard-basic" 
                                label="OTP" 
                                name='otp' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.otp} 
                                helperText={formik.errors.otp && formik.touched.otp ? formik.errors.otp : false}
                                error={formik.errors.otp && formik.touched.otp ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <br />
                            <Button variant="contained" type='submit' sx={{background:'#ff6a00', color:'black'}}><b>Verify</b></Button>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}