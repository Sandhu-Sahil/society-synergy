import React, { useEffect, useState } from "react";
import styles from '../../styles/department.module.css';
import { EventCard, CoordCard, Footer, Header } from '@/components';
import { motion } from 'framer-motion';
import DisplayLottie from '@/components/Lottie';
import Head from 'next/head';
import Background from '@/components/Background';
import { useRouter } from 'next/router';
import Lottie from "react-lottie";
import { BsGithub, BsInstagram, BsLink, BsLinkedin } from "react-icons/bs";
import GetHome from "@/services/home/Home";
import GetEvent from "@/services/event/GetEvent";
import { useCookies } from "react-cookie";
import RsvpUser from "@/services/event/RsvpUser";
import { toast, ToastContainer } from "react-toastify";
import RsvpButton from "@/components/RsvpButton";

// toast.configure();
export default function Event({data , data2}) {
    const [deptData, setDeptData] = useState(null);
    const [event, setEvent] = useState([]);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    useEffect(() => {
        async function fetchdata() {
            setDeptData(data.club);
            setEvent(data.event);
        }
        fetchdata();
    }, []);
    
    return (
        <>
        <Head>
            <title>Society Synergy</title>
            <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header selected={'Departments'} departments={data2.clubs}/>
        <Background />
        <div className={styles.parentDiv}>
            <div className={styles.aboutDept}>
            <DeptTitle deptName={event?.name} deptCoordName={deptData?.name} deptImage={event?.posterUrl} 
                deptGithub={deptData?.github} deptInsta={deptData?.instagram} deptLinkIn={deptData?.linkedIn} deptWebsite={deptData?.website}
            />
            <DeptDescription deptDesc={event?.description} />
            <RsvpButton rsvpEvent={event?._id} deptid={deptData?._id}/>
            </div>
            <Footer />
        </div>
        </>
    );
}

export async function getServerSideProps(context) { 
  const res = await GetEvent(context.query.eventID);
  const res2 = await GetHome();

  return {props: {data: res.data , data2: res2.data}}
}

const DeptTitle = ({ deptName, deptCoordName, deptImage, deptWebsite, deptGithub, deptInsta, deptLinkIn }) => {
    return (
      <div className={styles.deptTitle}>
        <div>
          <h1>{deptName}</h1>
          <h4>Coordinator(s): {deptCoordName}</h4>
          <div style={{marginTop:"1rem"}}>
            {
              deptInsta == "" ? null : <a
                target="_blank"
                referrerPolicy="no-referrer"
                href={deptInsta}
                style={{ marginLeft: '10px' }}>
                <BsInstagram color="white" />
              </a>
            }
            {
              deptLinkIn == "" ? null : <a
                target="_blank"
                referrerPolicy="no-referrer"
                href={deptLinkIn}
                style={{ marginLeft: '10px' }}>
                <BsLinkedin color="white" />
              </a>
            }
            {
              deptGithub == "" ? null : <a
                target="_blank"
                referrerPolicy="no-referrer"
                href={deptGithub}
                style={{ marginLeft: '10px' }}>
                <BsGithub color="white" />
              </a>
            }
            {
              deptWebsite == "" ? null : <a
                target="_blank"
                referrerPolicy="no-referrer"
                href={deptWebsite}
                style={{ marginLeft: '10px' }}>
                <BsLink color="white" />
              </a>
            }
          </div>
        </div>
        <img src={deptImage} loading="lazy" />
      </div>
    );
};

const DeptDescription = ({ deptDesc }) => {
    return (
      <div className={styles.deptDesc}>
        <p>{deptDesc}</p>
      </div>
    );
};