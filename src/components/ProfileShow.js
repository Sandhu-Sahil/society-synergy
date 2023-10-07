import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Login from '@/components/user/Login';
import UserProfile from '@/components/user/UserProfile';

export default function ProfileShow() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    return(
    <>
        {cookies.jwtSandhuToken ? (
            <UserProfile />
        ) : (
            <Login />
        )}
    </>
)}
