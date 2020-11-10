import React from "react";
import styles from "./landingLinks.module.scss";
import Link from "next/link";

const LandingLink = ({ link, image }) => {
  return (
    <Link href={`/${link}`}>
      <div
        className={styles.landingLink}
        style={{ background: `url(${image.formats.small.url})` }}
      >
        <div className={styles.text}>{link}</div>
      </div>
    </Link>
  );
};

export default LandingLink;
