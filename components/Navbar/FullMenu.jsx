import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";
import { url } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";

const FullMenu = (props) => {
  const router = useRouter();
  return (
    <>
      {props.links.map((link) => (
        <div
          className={styles.link}
          onClick={() => {
            Cookie.set("prev", location.pathname);
          }}
          key={`lnm-${link}`}
        >
          {link === "login" ? (
            props.user.username ? (
              <Link href={`/account`}>Account</Link>
            ) : (
              <Link href={`${url}/connect/google`}>{link}</Link>
            )
          ) : (
            <Link href={`/${link}`}>{link}</Link>
          )}
        </div>
      ))}
      <div className={styles.basket}>
        <Link href="/cart">
          <FontAwesomeIcon icon={["fas", "shopping-basket"]} />
        </Link>
        <div className={styles.itemCount}>{props.cart.length}</div>
      </div>
    </>
  );
};

export default FullMenu;
