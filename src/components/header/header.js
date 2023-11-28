import { useState, useEffect } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import GetHome from '@/services/home/Home';
import { useCookies } from 'react-cookie';

const HeaderComp = ({ selected, data }) => {
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const [isResourceDrawerVisible, setResourceDrawerVisibility] = useState(false);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [departments, setdepartments] = useState(data);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const drawerHandleMouse = () => {
    setDrawerVisibility((current) => !current);
  };
  const resourceDrawerHandleMouse = () => {
    setResourceDrawerVisibility((current) => !current);
  };
  const menuHandleMouseClick = () => {
    setMenuVisibility((current) => !current);
  };

  const menuHandleMouseLeave = () => {
    setMenuVisibility(false);
    setDrawerVisibility(false);
    setResourceDrawerVisibility(false);
  };

  return (
    <>
      <Link href="/">
        <img loading="lazy" width={30} src="/logo1.svg" alt="Logo" />
        <img loading="lazy" width={180} src="/text.png" alt="Logo" />
      </Link>
      <section>
        <Link
          style={{ height: '30px' }}
          id={selected == 'Home' ? styles.selected : undefined}
          href="/"
        >
          HOME
        </Link>
        <div
          onMouseEnter={drawerHandleMouse}
          onMouseLeave={drawerHandleMouse}
          style={{ display: 'flex', height: '30px' }}
        >
          <Link id={selected == 'Departments' ? styles.selected : undefined} href="#">
            DEPARTMENTS
          </Link>
          {isDrawerVisible && <DeptDrawer isVisible={isDrawerVisible} departments={departments} />}
        </div>
        <Link
          style={{ height: '30px' }}
          id={selected == 'Gallery' ? styles.selected : undefined}
          href="/gallery"
        >
          GALLERY
        </Link>
        <Link
          style={{ height: '30px' }}
          id={selected == 'Contact' ? styles.selected : undefined}
          href="/contact-us"
        >
          CONTACT
        </Link>
        <Link
          style={{ height: '30px' }}
          id={selected == 'Profile' ? styles.selected : undefined}
          href="/profile"
        >
          {/* if cookies 'jwtSandhuToken' then return Profile else sign-up */}
          {cookies?.jwtSandhuToken ? 'PROFILE' : 'SIGN-UP'} 
        </Link>
      </section>
      <div id={styles.menuButton} onMouseLeave={menuHandleMouseLeave}>
        <GiHamburgerMenu color="white" size={25} onClick={menuHandleMouseClick} />
        {isMenuVisible && (
          <MenuDrawer
            selected={selected}
            isDrawerVisible={isDrawerVisible}
            drawerHandleMouse={drawerHandleMouse}
            resourceDrawerHandleMouse={resourceDrawerHandleMouse}
            isResourceDrawerVisible={isResourceDrawerVisible}
            departments={departments}
          />
        )}
      </div>
      {/* {isMenuVisible && <MenuDrawer selected={selected} vertical={true} />} */}
    </>
  );
};

const MenuDrawer = ({
  selected,
  isDrawerVisible,
  drawerHandleMouse,
  resourceDrawerHandleMouse,
  isResourceDrawerVisible,
  departments
}) => {
  return (
    <section id={styles.menuDrawerVisible}>
      <Link id={selected == 'Home' ? styles.selected : undefined} href="/">
        HOME
      </Link>
      {/* 480 for Home + 4 */}
      {/* Change @media (max-width: __px) accordingly <Link id={selected == 'Resources' ? styles.selected : undefined} href='/resources'>
					RESOURCES
				</Link> */}
      {/* 400 for Home + 3*/}
      <div
        onMouseEnter={drawerHandleMouse}
        onMouseLeave={drawerHandleMouse}
        style={{ display: 'flex' }}
      >
        <Link id={selected == 'Departments' ? styles.selected : undefined} href="#">
          DEPARTMENTS
        </Link>
        {isDrawerVisible && <DeptDrawer isVisible={isDrawerVisible} departments={departments} />}
      </div>
      <Link id={selected == 'Gallery' ? styles.selected : undefined} href="/gallery">
        GALLERY
      </Link>
      <Link id={selected == 'Contact' ? styles.selected : undefined} href="/contact-us">
        CONTACT
      </Link>
      <Link id={selected == 'Profile' ? styles.selected : undefined} href="/profile">
        PROFILE
      </Link>
    </section>
  );
};

const DeptDrawer = ({ isVisible, departments }) => {
  return (
    <div className={`${styles.drawer} ${isVisible ? styles.isVisible : ''}`}>
      {
        departments.map((dept) => (
          <Link className={styles.drawerText} href={`/department/${dept?._id}`}>
            {dept.name}
          </Link>
        ))
      }
      
    </div>
  );
};

const Header = ({ selected, departments }) => {
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsElevated(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header
        style={{
          boxShadow: isElevated
            ? 'rgba(0, 0, 0, 0.2) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
            : 'none'
        }}
        className={styles.header}
      >
        <HeaderComp selected={selected} data={departments} />
      </header>
      <header
        style={{
          boxShadow: isElevated
            ? 'rgba(0, 0, 0, 0.2) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
            : 'none'
        }}
        className={styles.header}
        id={styles.copy}
      >
        <HeaderComp selected={selected} data={departments} />
      </header>
    </>
  );
};

export default Header;
