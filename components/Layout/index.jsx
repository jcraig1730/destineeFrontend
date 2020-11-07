import React from "react";
import styles from "./layout.module.scss";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
