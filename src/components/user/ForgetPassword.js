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

toast.configure();
export default function ForgetPassword(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        email: '',
    })
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('required*').email("Please enter a valid email"),
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
        toast.success('OTP sent to your email', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
        }); 
        router.push('/user/otp');       
    }
    return(
        <>
        <div className={styles.outtermain}>
            <div className={styles.outterBox}>
                <div className={styles.loginHeading}>
                    <h1 style={{textAlign:'center'}}>Forgot Password?</h1>
                    <p style={{textAlign:'center'}}>You can login through OTP</p>
                </div>
                <div className={styles.innerBox}>
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
                            <br />
                            <Button variant="contained" type='submit' sx={{background:'#ff6a00', color:'black'}}><b>Submit</b></Button>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}