import React from "react";
import styles from "./landingLinks.module.scss";
import LandingLink from "./LandingLink";

const links = ["shop", "art", "about"];

const LandingLinks = (props) => {
  return (
    <div className={styles.landingLinks}>
      {links.map((link) => (
        <LandingLink link={link} key={`link-${link}`} image={props[link]} />
      ))}
    </div>
  );
};

export default LandingLinks;
