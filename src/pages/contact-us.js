import React from 'react'; 
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { CoordCard, Footer, Header } from '@/components';
import Background from '@/components/Background';
import { motion } from 'framer-motion';
import GetHome from '@/services/home/Home';

toast.configure();
export default function ContactUs({ data}) {
    const coords = [
        {
            name: 'Sahilsher Singh',
            committee: 'Technical Coordinator',
            linkedin: 'https://www.linkedin.com/in/sahilsher-singh/',
            github: 'https://github.com/Sandhu-Sahil',
            instagram: 'https://www.instagram.com/sandhu._.sahil_/',
            mail: 'mailto:sandhu.sahil2002@gmail.com',
        },
        {
            name: 'Arnav Bharghav',
            committee: 'Integration Coordinator',
            linkedin: 'https://www.linkedin.com/in/',
            github: 'https://github.com/SOURHEAD',
            instagram:'',
            mail:'mailto:iisourhead23ii@gmail.com',
        },
        {
            name: 'Aryan kulshreshtha',
            committee: 'PR Coordinator',
            linkedin: 'https://www.linkedin.com/in/aryan-kulshrestha-993248221',
            github: 'https://github.com/aryankul15',
            instagram:'',
            mail:'',
        },
        {
            name: 'Jatin Poonia',
            committee: 'Content Coordinator',
            linkedin: 'https://www.linkedin.com/in/pooniajatin',
            github:'https://github.com/pooniajatin',
            instagram:'https://instagram.com/chaudhary_jatin_poonia',
            mail:'mailto:pooniajatin007@gmail.com',
        }
    ];

    return (
        <>
            <Head>
                <title>Society Synergy</title>
                <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header selected={'Contact'} departments={data.clubs}/>
            <Background />
            <div style={{ zIndex: '2', position: 'relative' }}>
            <section className={styles.section} style={{ width: '100%' }}>
                <h3>Coordinators</h3>
                <div className={styles.cardSection}>
                    {coords.map(
                    (member, index) =>
                     (
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
                            coordCommittee={member.committee}
                            coordLinkedIn={member.linkedin}
                            coordGitHub={member.github}
                            coordInsta={member.instagram}
                            coordMail={member.mail}
                            />
                        </motion.div>
                        )
                    )}
                </div>
            </section>
            <Footer />
        </div>
        </>
    )
}

export async function getServerSideProps() { 
    const res = await GetHome();
  
    return {props: {data: res.data}}
}