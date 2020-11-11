import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.scss";
import Link from "next/link";

const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.followLinks}>
        <div className={styles.followLink}>
          <Link href="">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Link>
        </div>
        <div className={styles.followLink}>
          <Link href="">
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </Link>
        </div>
        <div className={styles.followLink}>
          <Link href="">
            <FontAwesomeIcon icon={["fab", "pinterest"]} />
          </Link>
        </div>
        <div className={styles.followLink}>
          <Link href="">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </Link>
        </div>
        <div className={styles.followLink}>
          <Link href="">
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </Link>
        </div>
      </div>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/terms-of-service">Terms of Service</Link>
      <div className={styles.tag}>
        Made by{" "}
        <span className={styles.hand}>
          <FontAwesomeIcon icon={["fas", "hand-sparkles"]} />
        </span>{" "}
        with{" "}
        <span className={styles.heart}>
          <FontAwesomeIcon icon={["fas", "heart"]} />
        </span>{" "}
        by Destinee
      </div>
    </div>
  );
};

export default Footer;
