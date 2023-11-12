import React from 'react';
import styles from './coordCard.module.css';
import Image from 'next/image';
import { BsGithub, BsLinkedin, BsMailbox2, BsInstagram } from 'react-icons/bs';

const CoordCard = ({ coordName, coordCommittee, coordLinkedIn, coordGitHub, coordInsta, coordMail }) => {
  return (
    <div className={styles.coordCard}>
      <div className={styles.coordName}>{coordName}</div>
      <p>{coordCommittee}</p>
      <div className={styles.coordIcon}>
        {coordLinkedIn == undefined ? null : 
          <a target="_blank" referrerPolicy="no-referrer" href={coordLinkedIn}>
            <BsLinkedin color="white" />
          </a>
        }
        {coordGitHub == undefined ? null : <a
            target="_blank"
            referrerPolicy="no-referrer"
            href={coordGitHub}
            style={{ marginLeft: '10px' }}>
            <BsGithub color="white" />
          </a>
        }
        {
          coordMail == undefined ? null : <a
            target="_blank"
            referrerPolicy="no-referrer"
            href={coordMail}
            style={{ marginLeft: '10px' }}>
            <BsMailbox2 color="white" />
          </a>
        }
        {
          coordInsta == undefined ? null : <a
            target="_blank"
            referrerPolicy="no-referrer"
            href={coordInsta}
            style={{ marginLeft: '10px' }}>
            <BsInstagram color="white" />
          </a>
        }
      </div>
    </div>
  );
};

const SubCoordCard = ({ coordName, coordLinkedIn }) => {
  return (
    <div className={styles.subCoordCard}>
      <a href={coordLinkedIn} target="_blank" referrerPolicy="no-referrer">
        <BsLinkedin color="white" />
      </a>
      <p>{coordName}</p>
    </div>
  );
};

export { CoordCard, SubCoordCard };
