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
import ChangepasswordApi from '@/services/userService/Changepassword';

toast.configure();
export default function ChangePassword(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        otp: '',
        password: '',
        cpassword: '',
    })
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('required*').length(8, 'OTP length should be 8'),
        password: Yup.string().required("required*").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        cpassword: Yup.string().required("Required*").oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
        const res = await ChangepasswordApi(values, cookies.jwtSandhuToken)
          .then((res) => {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
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
                    <h1 style={{textAlign:'center'}}>Update Password</h1>
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
                            <TextField 
                                required 
                                id="standard-basic" 
                                label="New Password" 
                                name='password' 
                                variant="standard"
                                type='password'
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.password} 
                                helperText={formik.errors.password && formik.touched.password ? formik.errors.password : false}
                                error={formik.errors.password && formik.touched.password ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField 
                                required 
                                id="standard-basic" 
                                label="Confirm Password" 
                                name='cpassword' 
                                variant="standard"
                                type='password'
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.cpassword} 
                                helperText={formik.errors.cpassword && formik.touched.cpassword ? formik.errors.cpassword : false}
                                error={formik.errors.cpassword && formik.touched.cpassword ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <br />
                            <Button variant="contained" type='submit' sx={{background:'#ff6a00', color:'black'}}><b>Update</b></Button>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}