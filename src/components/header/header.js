import { useState, useEffect } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

const HeaderComp = ({ selected }) => {
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const [isResourceDrawerVisible, setResourceDrawerVisibility] = useState(false);
  const [isMenuVisible, setMenuVisibility] = useState(false);

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
          {isDrawerVisible && <DeptDrawer isVisible={isDrawerVisible} />}
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
          PROFILE
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
  isResourceDrawerVisible
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
        {isDrawerVisible && <DeptDrawer isVisible={isDrawerVisible} />}
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

const DeptDrawer = ({ isVisible }) => {
  return (
    <div className={`${styles.drawer} ${isVisible ? styles.isVisible : ''}`}>
      <Link className={styles.drawerText} href="/departments/aaa">
        aaa
      </Link>
      <Link className={styles.drawerText} href="/departments/bbb">
        bbb
      </Link>
      <Link className={styles.drawerText} href="/departments/ccc">
        ccc
      </Link>
      <Link className={styles.drawerText} href="/departments/ddd">
        ddd
      </Link>
    </div>
  );
};

const Header = ({ selected }) => {
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
        <HeaderComp selected={selected} />
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
        <HeaderComp selected={selected} />
      </header>
    </>
  );
};

export default Header;
