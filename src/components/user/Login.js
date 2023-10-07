import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button } from '@mui/material';
import styles from './user.module.css';
import LoginAxios  from '@/services/userService/LoginService';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

toast.configure();
export default function Login(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    })
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('required*').email("Please enter a valid email"),
        password: Yup.string().required("required*").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
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
        const res = await LoginAxios(values)
          .then((res) => {
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
          });
    }
    return(
        <>
        <div className={styles.outtermain}>
            <div className={styles.outterBox}>
                <div className={styles.loginHeading}>
                    <h1 style={{textAlign:'center'}}>Welcome Aboard!</h1>
                </div>
                <div className={styles.innerBox}>
                    <div className={styles.loginLottie}>
                        <div>
                        <Lottie options={{
                            loop: true,
                            autoplay: true,
                            animationData: require('../../data/animationLogin.json'),
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
                            <br />
                            <Button variant="contained" type='submit' sx={{background:'#ff6a00', color:'black'}}><b>Submit</b></Button>
                            <br />
                        </form>
                        <Link href='/user/forgot-password'> Forgot Password? </Link>
                        <Link href='/user/register'> Don't have an account? </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}