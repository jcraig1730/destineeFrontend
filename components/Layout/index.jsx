import React from "react";
import styles from "./layout.module.scss";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Link from "next/link";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        <Link href="/cart">
          <div
            style={{
              position: "fixed",
              top: "120px",
              zIndex: "10",
              background: "#88888888",
              color: "white",
              padding: "30px",
              right: 0,
            }}
          >
            Cart
          </div>
        </Link>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
