import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import styles from "./navbar.module.scss";

const ExpandedModal = (props) => {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    const body = document.querySelector("body");
    const modal = document.createElement("div");
    body.appendChild(modal);
    body.style.overflow = "hidden";
    setTarget(modal);
    return () => {
      body.removeChild(modal);
      body.style.overflow = "scroll";
    };
  }, []);

  if (target)
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.expandedLinks}>
          {props.links.map((link) => (
            <div className={styles.expandedLink}>
              <Link href={`/${link}`}>{link}</Link>
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
