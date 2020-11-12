import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";
import { url } from "../../helpers";
import cn from "classnames";

const FullMenu = (props) => {
  const router = useRouter();
  return props.links.map((link) => (
    <div className={styles.link} key={`lnm-${link}`}>
      {link === "login" ? (
        <Link href={`${url}/connect/google`}>{link}</Link>
      ) : (
        <Link href={`/${link}`}>{link}</Link>
      )}
    </div>
  ));
};

export default FullMenu;
