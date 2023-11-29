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
import GetHome from "@/services/home/Home";
import Carousel from "react-elastic-carousel";
import { toast } from "react-toastify";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

toast.configure();
export default function Department({data , data2}) {
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
            setEvents(data.events);
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

export async function getServerSideProps(context) { 
  const res = await GetDepartment(context.query.departmentID);
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
        <h2 className={styles.sectionHeading}>Events</h2>
  
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
              {events.map((event, i) => (
                <motion.div
                  className={styles.card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0 }
                  }}
                >
                  <EventCard
                    key={event?._id}
                    eventName={event?.name.slice(0, 30) + '...'}
                    desc={event?.description.slice(0, 200) + '...'}
                    image={event?.posterUrl}
                    href={"/event/"+event?._id}
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