import React, { useState } from 'react';
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

export default function Rregister(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
        cpassword: '',
        firstName: '',
        lastName: '',
        userName: '',
        phoneNo: ''
    })
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Required*").matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Please enter a valid first name"),
        lastName: Yup.string().required("Required*").matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Please enter a valid last name"),
        userName: Yup.string().required("Required*").matches(/^[a-zA-Z0-9_-]{3,20}$/, "Please enter a valid username"),
        email: Yup.string().required('required*').email("Please enter a valid email"),
        password: Yup.string().required("required*").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        cpassword: Yup.string().required("Required*").oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
        const res = await RegisterAxios(values)
          .then((res) => {
            console.log(res)
            const token = res.data.data.token
            setCookie('jwtSandhToken', token, { path: '/' });
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            router.push('/');
          })
          .catch((error) => {
            toast.error(error.response?.data?.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            values.phoneNo = tempPhoneNo;
          });
    }
    return(
        <>
        <div className={styles.outtermain}>
            <div className={styles.outterBox}>
                <div className={styles.loginHeading}>
                    <h1 style={{textAlign:'center'}}>Join Aboard with us!</h1>
                </div>
                <div className={styles.innerBox}>
                    <div className={styles.loginLottie}>
                        <div>
                        <Lottie options={{
                            loop: true,
                            autoplay: true,
                            animationData: require('../../data/animationRegister.json'),
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                            }}
                        />
                        </div>
                    </div>
                    <div className={styles.loginData}>
                        <form autoComplete="off" onSubmit={formik.handleSubmit} className={styles.inputLoginForm}>
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
                                required 
                                id="standard-basic" 
                                label="Email" 
                                name='email' 
                                variant="standard"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                value={formik.values.email} 
                                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : false}
                                error={formik.errors.email && formik.touched.email ? true : false}
                                className='login-input'
                                sx={{label: {color: 'white'}, input:{borderBottom: '1px solid white', color:'white'}}}
                            />
                            <br />
                            <TextField 
                                required 
                                id="standard-basic" 
                                label="Password" 
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
                            <Button variant="contained" type='submit' sx={{background:'#ff6a00', color:'black'}}><b>Register</b></Button>
                            <br />
                        </form>
                        <Link href='/profile'> Already have an account? </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}