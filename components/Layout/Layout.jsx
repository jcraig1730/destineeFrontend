import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartModal from "../CartModal";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar user={props.user} cart={props.cart} />
      <main className={styles.content}>{props.children}</main>
      <Footer />
      {props.cartModalActive && <CartModal closeModal={props.closeModal} />}
    </div>
  );
};

export default Layout;
