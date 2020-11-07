import React from "react";
import styles from "./layout.module.scss";
import Navbar from "../Navbar";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Layout;
