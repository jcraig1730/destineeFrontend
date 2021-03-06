import React from "react";
import styles from "./navbar.module.scss";
import ExpandedModal from "./ExpandedModal";

const MobileMenu = (props) => {
  return (
    <div className={styles.mobileMenu}>
      <div
        className={styles.menu}
        onClick={() => props.setExpanded(!props.mobileMenuExpanded)}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {props.mobileMenuExpanded && (
        <ExpandedModal
          links={props.links}
          closeMobileMenuOnClick={props.closeMobileMenuOnClick}
          user={props.user}
          cart={props.cart}
        />
      )}
    </div>
  );
};

export default MobileMenu;
