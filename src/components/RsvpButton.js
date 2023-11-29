import React, { useEffect, useState } from "react";
import styles from '../styles/department.module.css';
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie";
import RsvpUser from "@/services/event/RsvpUser";
import { toast } from "react-toastify";

toast.configure();
export default function RsvpButton({rsvpEvent, deptid}) {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const rsvpUser = async () => {
        // check if user is logged in
        if(!cookies?.jwtSandhuToken){
            router.push('/profile');
            return;
        }

        const res = await RsvpUser({
            "eventID": rsvpEvent
        }, cookies?.jwtSandhuToken)
          .then((res) => {
            router.push('/profile');
            toast.success(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          })
          .catch((error) => {
            router.push('/department/' + deptid);
            toast.error(error?.response?.data?.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
        );
    }   

    return (
        <>
        <button className={styles.rsvpbtn} onClick={rsvpUser}>RSVP to the event</button>
        </>
    );
}