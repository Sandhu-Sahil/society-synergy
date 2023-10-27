import { toast } from "react-toastify";
import styles from '../../styles/department.module.css';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetUser from "@/services/userService/GetUser";
import EventCard from "../eventCard/eventCard";
import { motion } from "framer-motion";
import OtpSend from "@/services/userService/OtpSend";
import { useRouter } from "next/router";

toast.configure();
export default function UserProfile(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchdata() {
            let dataFromSomeAPI = await GetUser(0, cookies.jwtSandhuToken);
            setUser(dataFromSomeAPI.data.data);
        }
        async function fetchdata2() {
            // let dataFromSomeAPI = await GetEvents();
            // setEvents(dataFromSomeAPI.data.data);
        }
        if (cookies.jwtSandhuToken){
            fetchdata();
            fetchdata2();
        }
    }, [cookies])

    const varifyUser = async () => {
        const res = await OtpSend(cookies?.jwtSandhuToken)
          .then((res) => {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            setCookie('SandhuOtpEmail', user.email, { path: '/' });
            router.push('/user/otp');
          })
          .catch((error) => {
            toast.error(error.response?.data?.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
          });
    }

    const changePassword = async () => {
        const res = await OtpSend(cookies?.jwtSandhuToken)
          .then((res) => {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            router.push('/user/change-password');
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
          });
    }

    const updateProfile = async () => {
        const res = await OtpSend(cookies?.jwtSandhuToken)
          .then((res) => {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            router.push('/user/update-profile');
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
        <div>
            <div className={styles.parentDiv}>
                <div className={styles.aboutDept}>
                    <div className={styles.deptTitle}>
                        <div>
                        <h1>{user?.userName}</h1>
                        <h4>Name: {user?.firstName} {user?.lastName}</h4>
                        <h4>Detail(s): {user?.email} | {user?.phoneNo}</h4>
                        <h4>Role: {user?.role}</h4>
                        <h4>Verified: {user?.varified == true ? "TRUE" : "FALSE"}</h4>
                        </div>
                    </div>
                    <div className={styles.butoons}>
                        <button onClick={updateProfile} className={styles.btn}>Edit Profile</button>
                        <button onClick={changePassword} className={styles.btn}>Change Password</button>
                        {user?.varified == false ? <button onClick={varifyUser} className={styles.btn}>Verify</button> : <></>   }
                    </div>
                </div>
                <EventCards events={events} />
            </div>
        </div>
        </>
    )
}
  
const EventCards = ({ events }) => {
return (
    <div className={styles.section}>
    <h2 className={styles.sectionHeading}>Events marked RSVP</h2>

    <motion.div className={styles.cardSection}>
        {events?.length > 0 ? (
        events.map((event, index) => (
            //   {event.old === false && (
            <motion.div
            key={event.key}
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
            }}
            >
            {/* <EventCard
                key={event.key}
                old={event.old}
                eventName={event.eventName}
                desc={event.desc}
                image={event.image}
                registerLink={event.registerLink}
            /> */}
            </motion.div>
        ))
        ) : (
        <h2 style={{ color: 'gainsboro' }}>No Events</h2>
        )}
    </motion.div>
    </div>
);
};