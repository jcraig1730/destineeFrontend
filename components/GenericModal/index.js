import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./genericModal.module.scss";

const GenericModal = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const target = document.createElement("div");
    target.className = "generic-modal";
    const body = document.querySelector("body");
    body.appendChild(target);
    body.style.overflow = "hidden";
    setIsMounted(true);
    return () => {
      body.removeChild(target);
      body.style.overflow = "inherit";
    };
  }, []);

  if (!isMounted) return <div></div>;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>,
    document.querySelector(".generic-modal")
  );
};

export default GenericModal;
