import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CoordCard, SubCoordCard, DeptCard, EventCard, Footer, Header } from '@/components';
import { motion } from 'framer-motion';
// import events from '@/data/events';
// import departments from '@/data/departments';
import Tilt from 'react-parallax-tilt';
import DisplayLottie from '@/components/Lottie';
import Background from '@/components/Background';

export default function Home({ coords, subcoords, events }) {
  return (
    <>
      <Head>
        <title>Society Synergy</title>
        <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header selected={'Home'} />
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
            <DisplayLottie animationPath="https://assets3.lottiefiles.com/packages/lf20_mXdqmT1SH2.json" />
          </motion.div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Upcoming Events</h2>
          <div className={styles.cardSection}>
            {/* {filteredEvents.map((event, index) => (
              //   {event.old === false && (
              <motion.div
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
            ))} */}
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Our Departments</h2>
          <div className={styles.cardSection}>
            {/* {departments.map((dept, index) => (
              <motion.div
                className={styles.card}
                key={dept.deptName}
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
                  deptName={dept.deptName}
                  deptImage={dept.deptImage}
                  deptDesc={dept.deptDesc}
                  deptLink={dept.deptLink}
                  bgColor={dept.bgColor}
                />
              </motion.div>
            ))} */}
          </div>
        </section>
        <section className={styles.section} style={{ width: '100%' }}>
          <h2 className={styles.sectionHeading}>Our Team</h2>
          <h3>Coordinators</h3>
          <div className={styles.cardSection} style={{ justifyContent: 'center' }}>
            {/* {coords.map(
              (member, index) =>
                member.committee === 'Overall Coordinator' && (
                  <motion.div
                    key={member.name}
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
                      coordName={member.name}
                      coordImage={`https://drive.google.com/uc?export=view&id=${member.image}`}
                      coordCommittee={member.committee}
                      coordLinkedIn={member.linkedin}
                      coordGitHub={member.github}
                      coordCFHandle={member.cfhandle}
                    />
                  </motion.div>
                )
            )} */}
          </div>
          <div className={styles.cardSection}>
            {/* {coords.map((member, index) => {
              if (member.committee !== 'Overall Coordinator') {
                return (
                  <motion.div
                    key={member.name}
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
                    {member.committee !== 'Overall Coordinator' && (
                      <CoordCard
                        coordName={member.name}
                        coordImage={`https://drive.google.com/uc?export=view&id=${member.image}`}
                        coordCommittee={member.committee}
                        coordLinkedIn={member.linkedin}
                        coordGitHub={member.github}
						coordCFHandle={member.cfhandle}
                      />
                    )}
                  </motion.div>
                );
              }
            })} */}
          </div>
          <h3>Sub-Coordinators</h3>
          {/* {!(subcoords.length > 0) && (
            <div className={styles.cardSection}>
              <p style={{ textAlign: 'center', width: '100%' }}>
                Sub-Coordinator details will be updated soon.
              </p>
            </div>
          )} */}
          {/* {subcoords.length > 0 && (
            <div className={styles.cardSection}>
              <div className={styles.committee}>
                <p>Competitive Programming</p>

                {subcoords.map((member) => {
                  if (member.committee === 'CP') {
                    return (
                      <SubCoordCard
                        key={member.linkedin}
                        coordName={member.name}
                        coordLinkedIn={member.linkedin}
                      />
                    );
                  }
                })}
              </div>
              <div className={styles.committee}>
                <p>Development & Open Source</p>

                {subcoords.map((member) => {
                  if (member.committee === 'Dev&OS') {
                    return (
                      <SubCoordCard
                        key={member.linkedin}
                        coordName={member.name}
                        coordLinkedIn={member.linkedin}
                      />
                    );
                  }
                })}
              </div>
              <div className={styles.committee}>
                <p>Machine Learning</p>

                {subcoords.map((member) => {
                  if (member.committee === 'ML') {
                    return (
                      <SubCoordCard
                        key={member.linkedin}
                        coordName={member.name}
                        coordLinkedIn={member.linkedin}
                      />
                    );
                  }
                })}
              </div> */}
              {/* 
            <div className={styles.committee}>
            <p>Cyber Security</p>
            {subcoords.map((member) => {
              if (member.committee === 'CyberSec') {
                return (<SubCoordCard key={member.linkedin} coordName={member.name} coordLinkedIn={member.linkedin}/>)
              }
            })}
          </div> */}
            {/* </div>
          )}
          ; */}
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
              <DisplayLottie animationPath="https://assets1.lottiefiles.com/packages/lf20_v1yudlrx.json" />
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
            src="team.png"
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
