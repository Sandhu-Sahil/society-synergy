import React from 'react'; 
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { CoordCard, Footer, Header } from '@/components';
import Background from '@/components/Background';
import { motion } from 'framer-motion';

export default function ContactUs() {
    const coords = [
        {
            name: 'Sahilsher Singh',
            committee: 'Technical Coordinator',
            linkedin: 'https://www.linkedin.com/in/',
            github: 'https://github.com/Sandhu-Sahil',
        },
        {
            name: 'Arnav Bharghav',
            committee: 'Integration Coordinator',
            linkedin: 'https://www.linkedin.com/in/',
            github: 'https://github.com/SOURHEAD',
        },
        {
            name: 'Aryan kulshreshtha',
            committee: 'PR Coordinator',
            linkedin: 'https://www.linkedin.com/in/',
            github: '',
        },
        {
            name: 'Jatin Poonia',
            committee: 'Content Coordinator',
            linkedin: '',
            github:'https://github.com/pooniajatin',
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
            <Header selected={'Contact'} />
            <Background />
            <div style={{ zIndex: '2', position: 'relative' }}>
            <section className={styles.section} style={{ width: '100%' }}>
                <h3>Coordinators</h3>
                <div className={styles.cardSection} style={{ justifyContent: 'center' }}>
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