import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

const FullMenu = (props) => {
  return props.links.map((link) => (
    <div className={styles.link} key={`lnm-${link}`}>
      <Link href={`/${link}`}>{link}</Link>
    </div>
  ));
};

export default FullMenu;
