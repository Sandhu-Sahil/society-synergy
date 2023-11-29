import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CoordCard, SubCoordCard, DeptCard, EventCard, Footer, Header } from '@/components';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import DisplayLottie from '@/components/Lottie';
import Background from '@/components/Background';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Lottie from 'react-lottie';
import { toast } from 'react-toastify';
import url from '@/services/index'
import { useRouter } from 'next/router';
import GetHome from '@/services/home/Home'
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

export default function Home({ data }) {
  const [maindata, setmaindata] = useState(data);
  const [bgColor, setbgColor] = useState(["#FF6559","#0091BD","#FFAC2A","#ff80ab"]);
  const [departments, setdepartments] = useState([]);
  const [filteredEvents, setfilteredEvents] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const carouselRef = React.useRef(null);

  useEffect(() => {
    async function fetchData() {
      setdepartments(data.clubs);
      setfilteredEvents([...data.events]);
    }
    fetchData();
  }, [])

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the last item, go to first item
      carouselRef.current.goTo(0);
    }
  };
  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the first item, go to last item
      carouselRef.current.goTo(filteredEvents.length);
    }
  };

  return (
    <>
      <Head>
        <title>Society Synergy</title>
        <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header selected={'Home'} departments={data.clubs} />
      <Background />
      <div style={{ zIndex: '2', position: 'relative' }}>
        <section className={styles.heroSection}>
          <motion.div
            className={styles.njackhero}
            initial={{ opacity: 0, x: '-100%' }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            <Tilt>
              <img className={styles.logo} loading="lazy" src="/logo1.svg" alt="Logo" />
            </Tilt>
            <Tilt>
              <img className={styles.logotext} loading="lazy" src="/text.png" alt="Logo" />
            </Tilt>
            <p className={styles.subHeroText}>Clubbing Together Changing Forever:<br></br> Your VIP Pass to Campus Life</p>
          </motion.div>
          <motion.div
            className={styles.lottiehero}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <Lottie options={{
                  loop: true,
                  autoplay: true,
                  animationData: require('../data/lottie-home.json'),
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
              />
            </div>
          </motion.div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Upcoming Events</h2>
          <div className={styles.cardSection}>
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
              if (index === filteredEvents.length - 1) {
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
            {filteredEvents.map((event, i) => (
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
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Our Departments</h2>
          <div className={styles.cardSection}>
            {departments.map((dept, index) => (
              <motion.div
                className={styles.card}
                key={dept?.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0 }
                }}
              >
                <DeptCard
                  deptName={dept?.name}
                  deptImage={dept?.logoUrl}
                  deptDesc={dept?.description.slice(0, 200) + '...'}
                  deptLink={"/department/"+dept?._id}
                  bgColor={bgColor[index % 4]}
                />
              </motion.div>
            ))}
          </div>
        </section>
        <section className={styles.aboutSection}>
          <h2>About us</h2>
          <div>
            <motion.div
              className={styles.lottiehero}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              <div>
                <Lottie options={{
                    loop: true,
                    autoplay: true,
                    animationData: require('../data/lottie-team.json'),
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: '100%' }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              Society Synergy is the result of collaborative efforts by a dedicated 
              team of developers at JIIT Sector-128 (Jaypee Institute of Information and 
              Technology). It's a platform designed to assist JYC (JIIT Youth Club) in 
              effectively managing their clubs and societies, while also fostering unity 
              among our diverse community. Our mission: to empower, connect, and amplify the voices 
              of the dynamic groups that shape JIIT's campus life. We're more than 
              just a website; we're the catalyst for creativity, growth, and connection. 
              We forge friendships, launch exciting events, support passion projects, 
              and keep you informed about the latest happenings. Join us in this journey 
              of exploration and innovation. Society Synergy - where unity meets 
              diversity, and together, we create, inspire, and transform.
            </motion.p>
          </div>
        </section>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img
            alt="TeamWork"
            src="team2.png"
            style={{
              marginInline: '5%',
              maxWidth: '90vw',
              maxHeight: '25vh',
              objectFit: 'contain'
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { 
  const res = await GetHome();

  return {props: {data: res.data}}
}