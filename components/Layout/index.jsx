import React from "react";
import styles from "./layout.module.scss";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { connect } from "react-redux";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar user={props.user} cart={props.cart} />
      <main className={styles.content}>{props.children}</main>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userData,
  cart: state.cart,
});

export default connect(mapStateToProps)(Layout);
