import React, { useEffect, useState } from "react";
import styles from '../../styles/department.module.css';
import { EventCard, CoordCard, Footer, Header } from '@/components';
import { motion } from 'framer-motion';
import DisplayLottie from '@/components/Lottie';
import Head from 'next/head';
import Background from '@/components/Background';
import { useRouter } from 'next/router';
import GetDepartment from "@/services/department/GetDepartment";
import Lottie from "react-lottie";
import { BsGithub, BsInstagram, BsLink, BsLinkedin } from "react-icons/bs";

export default function Department() {
    const [deptData, setDeptData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [events, setEvents] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if(!router.query.departmentID) {
          return;
        }
        async function fetchdata() {
            var res = await GetDepartment(router.query.departmentID);
            setDeptData(res.data.club);
            setTeamData(res.data.members);
            setAdminData(res.data.admin);
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
        <Header selected={'Departments'} />
        <Background />
        <div className={styles.parentDiv}>
            <div className={styles.aboutDept}>
            <DeptTitle deptName={deptData?.name} deptCoordName={adminData?.firstName +" "+ adminData?.lastName} deptImage={deptData?.logoUrl} 
                deptGithub={deptData?.github} deptInsta={deptData?.instagram} deptLinkIn={deptData?.linkedIn} deptWebsite={deptData?.website}
              />
            <DeptDescription deptDesc={deptData?.description} />
            </div>
            <EventCards events={events} />
            <CoordSection coordArr={adminData} subCoordArr={teamData} />
            <Footer />
        </div>
        </>
    );
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
        <div>
        <Lottie options={{
            loop: true,
            autoplay: true,
            animationData: require('../../data/description.json'),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
        />
        </div>
        <p>{deptDesc}</p>
      </div>
    );
};

const EventCards = ({ events }) => {
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Events</h2>
  
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
                <EventCard
                  key={event.key}
                  old={event.old}
                  eventName={event.eventName}
                  desc={event.desc}
                  image={event.image}
                  registerLink={event.registerLink}
                />
              </motion.div>
            ))
          ) : (
            <h2 style={{ color: 'gainsboro' }}>No Events</h2>
          )}
        </motion.div>
      </div>
    );
};

const CoordSection = ({ coordArr, subCoordArr }) => {
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Team</h2>
  
        <motion.div className={styles.cardSectionTeams}>
          {coordArr != undefined ? (
              <motion.div
                key={coordArr?.userName}
                className={styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
              >
                  <CoordCard
                    key={coordArr?.userName}
                    coordName={"Prof. " + coordArr?.firstName + "\n" + coordArr?.lastName}
                    coordCommittee={"Faculty Coordinator"}
                    coordMail={"mailto:"+coordArr?.email}
                  />
              </motion.div>
          ) : (
            <h2 style={{ color: 'gainsboro' }}>No Coordinators</h2>
          )}
        </motion.div>
  
        <motion.div className={styles.cardSectionTeams}>
          {subCoordArr?.length > 0 ? (
            subCoordArr.map((member, index) => (
              <motion.div
                key={member.coordName}
                className={styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
              >
                <CoordCard
                  key={member?.name}
                  coordName={member?.name}
                  coordCommittee={member?.role}
                  coordLinkedIn={member?.linkedIn}
                  coordGitHub={member?.github}
                  coordInsta={member?.instagram}
                />
              </motion.div>
            ))
          ) : (
            <h2 style={{ color: 'gainsboro' }}>No Sub Coordinators</h2>
          )}
        </motion.div>
      </div>
    );
};