import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.briefInfo}>
          <img src="\logo1.svg" width={65} alt="Logo" />
          <br></br>
          <img src="\text.png" width={250} alt="Logo" />
          <br></br>
          <p>
            Society Synergy is an application that connects all the societies 
            and clubs at JITT-128, Noida
          </p>
        </div>
        {/* <div className={styles.links}>
          <h2>DEPARTMENTS</h2>
          <ul>
            <li>
              <Link href="/departments/aaa">aaa</Link>
            </li>
            <li>
              <Link href="/departments/bbb">bbb</Link>
            </li>
            <li>
              <Link href="/departments/ccc">ccc</Link>
            </li>
            <li>
              <Link href="/departments/ddd">ddd</Link>
            </li>
          </ul>
        </div> */}
        <div className={styles.links}>
          <h2>DEVELOPER'S TEAM</h2>
          <ul>
            <li>
              <Link href="https://github.com/Sandhu-Sahil">Sahilsher Singh Sandhu</Link>
            </li>
            <li>
              <Link href="https://github.com/SOURHEAD">Arnav Bhargava</Link>
            </li>
            <li>
              <Link href="#">Jatin Poonia</Link>
            </li>
            <li>
              <Link href="#">Aryan Kulshrestha</Link>
            </li>
          </ul>
        </div>
        <div className={styles.map}>
          <h2>VISIT OUR CAMPUS</h2>
          <iframe
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6723379196987!2d77.36263237549664!3d28.519504375726637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce63ce11389f3%3A0x97faab8dd880eb03!2sJIIT%20Academic%20Block!5e0!3m2!1sen!2sin!4v1695314814790!5m2!1sen!2sin"
            style={{ borderRadius: '5px', marginTop: '13px' }}
            allowFullScreen
          />
        </div>
      </div>
      <div className={styles.footerEnd}>
        <span style={{ fontWeight: 100 }}>
          &copy; {new Date().getFullYear()} Copyright{' '}
          <span style={{ fontWeight: 600 }}>Society Synergy.</span>
        </span>
        <span>Developed with ❤️ by Team Society Synergy</span>
      </div>
    </footer>
  );
};

export default Footer;
