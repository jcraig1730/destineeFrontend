import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

const Modal = (props) => {
  const [target, setTarget] = useState(null);
  const [injectedChildren, setInjectedChildren] = useState(null);

  const closeModal = () => {
    if (typeof document === "undefined") return;
    props.close();
  };

  useEffect(() => {
    const container = document.createElement("div");
    container.id = "modal";
    container.className = styles.modal;
    document.body.appendChild(container);
    document.body.style.overflow = "hidden";

    const childrenWithProps = [props.children].map((child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { closeModal });
      }
      return child;
    });
    setTarget(container);
    setInjectedChildren(childrenWithProps);
    return () => {
      document.body.style.overflow = "inherit";
      document.body.removeChild(document.querySelector("#modal"));
    };
  }, [props.children]);

  if (!target || !document.querySelector("#modal"))
    return <div style={{ display: "none" }}></div>;

  return ReactDOM.createPortal(
    injectedChildren,
    document.querySelector("#modal")
  );
};

export default Modal;
