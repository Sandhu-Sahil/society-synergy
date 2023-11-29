import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button } from '@mui/material';
import styles from './user.module.css';
import RegisterAxios  from '@/services/userService/RegisterService';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import OtpSend from '@/services/userService/OtpSend';
import GetUser from '@/services/userService/GetUser';
import UpdateUser from '@/services/userService/UpdateUser';

export default function UpdateProfile(){
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchdata() {
            let dataFromSomeAPI = await GetUser(0, cookies.jwtSandhuToken);
            setUser(dataFromSomeAPI.data.data);
            formik.setFieldValue('otp', '');
            formik.setFieldValue('firstName', dataFromSomeAPI.data.data.firstName);
            formik.setFieldValue('lastName', dataFromSomeAPI.data.data.lastName);
            formik.setFieldValue('userName', dataFromSomeAPI.data.data.userName);
            // remove +91 from phoneNo
            let tempPhoneNo = dataFromSomeAPI.data.data.phoneNo;
            tempPhoneNo = tempPhoneNo.slice(3);
            formik.setFieldValue('phoneNo', tempPhoneNo);
            formik.setFieldValue('email', dataFromSomeAPI.data.data.email);
        }
        
        if (cookies.jwtSandhuToken){
            fetchdata();
        }
    }, [cookies])

    const [initialValues, setInitialValues] = useState({
        otp:'waiting...',
        firstName: 'waiting...',
        lastName: 'waiting...',
        userName: 'waiting...',
        phoneNo: 'waiting...',
        email: 'waiting...',
    })
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('required*').length(8, 'OTP length should be 8'),
        firstName: Yup.string().required("Required*").matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Please enter a valid first name"),
        lastName: Yup.string().required("Required*").matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Please enter a valid last name"),
        userName: Yup.string().required("Required*").matches(/^[a-zA-Z0-9_-]{3,20}$/, "Please enter a valid username"),       
        phoneNo: Yup.string().required("Required*").matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
        enableReinitialize: true
    })
    const handleSubmit = async (values) => {
        let tempPhoneNo = values.phoneNo;
        values.phoneNo = "+91" + values.phoneNo;
        const res = await UpdateUser(values, cookies.jwtSandhuToken)
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
            formik.setFieldValue('phoneNo', tempPhoneNo)
          });
    }

    return(
        <>
        <div className={styles.outtermain}>
            <div className={styles.outterBox}>
                <div className={styles.loginHeading}>
                    <h1 style={{textAlign:'center'}}>Let's update yourself!</h1>
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
                            <br/>
                            <TextField                     
                                required 
                                id="standard-basic" 
                                label="First Name" 
                                name='firstName' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.firstName}
                                helperText={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : false}
                                error={formik.errors.firstName && formik.touched.firstName ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField                     
                                required 
                                id="standard-basic" 
                                label="Last Name" 
                                name='lastName' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.lastName} 
                                helperText={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : false}
                                error={formik.errors.lastName && formik.touched.lastName ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField                     
                                required 
                                id="standard-basic" 
                                label="Username" 
                                name='userName' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.userName} 
                                helperText={formik.errors.userName && formik.touched.userName ? formik.errors.userName : false}
                                error={formik.errors.userName && formik.touched.userName ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField                     
                                required 
                                id="standard-basic" 
                                label="Phone Number" 
                                name='phoneNo' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.phoneNo} 
                                helperText={formik.errors.phoneNo && formik.touched.phoneNo ? formik.errors.phoneNo : false}
                                error={formik.errors.phoneNo && formik.touched.phoneNo ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField                     
                                id="standard-basic" 
                                label="Email (could not be changed)" 
                                name='email' 
                                variant="standard"
                                value={formik.values.email} 
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