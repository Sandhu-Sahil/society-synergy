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

export default function Event({data , data2}) {
    const [deptData, setDeptData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [events, setEvents] = useState([]);
    const router = useRouter();
    useEffect(() => {
        async function fetchdata() {
            setDeptData(data.club);
            setTeamData(data.members);
            setAdminData(data.admin);
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
            {/* <div className={styles.aboutDept}>
            <DeptTitle deptName={deptData?.name} deptCoordName={adminData?.firstName +" "+ adminData?.lastName} deptImage={deptData?.logoUrl} 
                deptGithub={deptData?.github} deptInsta={deptData?.instagram} deptLinkIn={deptData?.linkedIn} deptWebsite={deptData?.website}
              />
            <DeptDescription deptDesc={deptData?.description} />
            </div>
            <EventCards events={events} />
            <CoordSection coordArr={adminData} subCoordArr={teamData} /> */}
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