import React, { useState, useEffect } from "react";
import styles from "./navbar.module.scss";
import MobileMenu from "./MobileMenu";
import FullMenu from "./FullMenu";
import Link from "next/link";

const links = ["shop", "art", "about", "login"];

const Navbar = (props) => {
  const [useMobileMenu, setUseMobileMenu] = useState(false);
  const [mobileMenuExpanded, setExpanded] = useState(false);

  const closeMobileMenuOnClick = () => {
    setExpanded(false);
  };

  if (typeof window !== "undefined")
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 785 && useMobileMenu) {
          setUseMobileMenu(false);
        } else if (window.innerWidth < 785 && !useMobileMenu) {
          setUseMobileMenu(true);
        }
      };
      handleResize();
      window.removeEventListener("resize", handleResize);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [useMobileMenu]);
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>
          <img
            src="https://res.cloudinary.com/destineesnecessities/image/upload/v1604699761/LogoMakr-3jROLT_wncmje.png"
            alt="Destinee's store logo"
          />
        </div>
      </Link>
      <div className={styles.links}>
        {useMobileMenu ? (
          <MobileMenu
            mobileMenuExpanded={mobileMenuExpanded}
            setExpanded={setExpanded}
            links={links}
            closeMobileMenuOnClick={closeMobileMenuOnClick}
            user={props.user}
            cart={props.cart}
          />
        ) : (
          <FullMenu cart={props.cart} user={props.user} links={links} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
