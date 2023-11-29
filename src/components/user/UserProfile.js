import { toast } from "react-toastify";
import styles from '../../styles/department.module.css';
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetUser from "@/services/userService/GetUser";
import EventCard from "../eventCard/eventCard";
import { motion } from "framer-motion";
import OtpSend from "@/services/userService/OtpSend";
import { useRouter } from "next/router";
import Carousel from "react-elastic-carousel";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];

toast.configure();
export default function UserProfile(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        async function fetchdata() {
            let dataFromSomeAPI = await GetUser(0, cookies.jwtSandhuToken);
            console.log(dataFromSomeAPI);
            setUser(dataFromSomeAPI?.data?.data?.user);
            setEvents(dataFromSomeAPI?.data?.data?.events);
        }
        async function fetchdata2() {
            // let dataFromSomeAPI = await GetEvents();
            // setEvents(dataFromSomeAPI.data.data);
        }
        
        if (cookies.jwtSandhuToken){
            fetchdata();
            fetchdata2();
        }
        setIsClient(true)
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

    const logout = () => {
        removeCookie('jwtSandhuToken', { path: '/' });
        removeCookie('user', { path: '/' });
        router.push('/profile');
    }

    return(
        <>
        <div>
            <div className={styles.parentDiv} style={{position:"relative",}}>
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
                        <button onClick={logout} className={styles.btn}>Logout</button>
                    </div>
                </div>
                <EventCards events={isClient ? events : null} />
            </div>
        </div>
        </>
    )
}
  
const EventCards = ({ events }) => {
    const carouselRef = React.useRef(null);
    const onNextStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the last item, go to first item
        carouselRef.current.goTo(0);
      }
    };
    const onPrevStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the first item, go to last item
        carouselRef.current.goTo(events.length);
      }
    };
return (
    <div className={styles.section}>
    <h2 className={styles.sectionHeading}>Events marked RSVP</h2>

    <motion.div className={styles.cardSection}>
        {events?.length > 0 ? (
            <Carousel breakPoints={breakPoints}
            ref={carouselRef}
            enableMouseSwipe={true}
            enableAutoPlay={true}
            enableSwipe={true}
            onChange={({ index }) => {
              // change index according to width of screen to show 1, 2, 3 or 4 cards
              if (window.innerWidth <= 550) {
                index = index + 0;
              } else if (window.innerWidth <= 768) {
                index = index + 1;
              } else if (window.innerWidth <= 1200) {
                index = index + 2;
              } else {
                index = index + 3;
              }
              if (index === events.length - 1) {
                // set crousel to start
                carouselRef.current.goTo(0);
              }
            }}
            onPrevStart={onPrevStart}
            onNextStart={onNextStart}
            focusOnSelect={true}
            autoPlaySpeed={2000}
            transitionMs={2000}
            easing="ease-in-out"
            tiltEasing="ease-in-out"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            tiltAngleXInitial={0}
            tiltAngleYInitial={0}
            tiltEnable={true}
            tiltReverse={true}
            disableArrowsOnEnd={false}
          >
            {events?.map((event, index) => (
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
            <EventCard
                key={event?.eventDetails?._id}
                eventName={event?.eventDetails?.name.slice(0, 30) + '...'}
                desc={event?.eventDetails?.description.slice(0, 200) + '...'}
                image={event?.eventDetails?.posterUrl}
                href={"/event/"+event?.eventDetails?._id}
            />
            </motion.div>
            ))}
            </Carousel>
        ) : (
        <h2 style={{ color: 'gainsboro' }}>No Events</h2>
        )}
    </motion.div>
    </div>
);
};