import React, { useState, useEffect } from "react";
import styles from "./navbar.module.scss";
import MobileMenu from "./MobileMenu";
import FullMenu from "./FullMenu";

const links = ["shop", "art", "about"];

const Navbar = (props) => {
  const [useMobileMenu, setUseMobileMenu] = useState(false);
  const [mobileMenuExpanded, setExpanded] = useState(false);

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
      <div className={styles.logo}>
        <img
          src="https://res.cloudinary.com/destineesnecessities/image/upload/v1604699761/LogoMakr-3jROLT_wncmje.png"
          alt="Destinee's store logo"
        />
      </div>
      <div className={styles.links}>
        {useMobileMenu ? (
          <MobileMenu
            mobileMenuExpanded={mobileMenuExpanded}
            setExpanded={setExpanded}
            links={links}
          />
        ) : (
          <FullMenu links={links} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
