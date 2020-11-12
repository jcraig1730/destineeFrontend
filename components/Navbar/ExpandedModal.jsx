import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { url } from "../../helpers";

const ExpandedModal = (props) => {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    const body = document.querySelector("body");
    const modal = document.createElement("div");
    body.appendChild(modal);
    body.style.overflow = "hidden";
    body.addEventListener("click", props.closeMobileMenuOnClick);
    setTarget(modal);
    return () => {
      body.removeChild(modal);
      body.style.overflow = "scroll";
      body.removeEventListener("click", props.closeMobileMenuOnClick);
    };
  }, []);

  if (target)
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.expandedLinks}>
          {props.links.map((link) => (
            <div className={styles.expandedLink} key={`lnf-${link}`}>
              {link === "login" ? (
                <Link href={`${url}/connect/google`}>{link}</Link>
              ) : (
                <Link href={`/${link}`}>{link}</Link>
              )}
            </div>
          ))}
        </div>
        <img
          src="https://res.cloudinary.com/destineesnecessities/image/upload/v1604711235/unicorn_with_flowers_eodwid.svg"
          alt=""
        />
      </div>,
      target
    );
  return <div></div>;
};

export default ExpandedModal;
