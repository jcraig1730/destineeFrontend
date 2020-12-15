import React from "react";
import styles from "./aboutPage.module.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const AboutPage = ({ about }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headline}>{about.title}</h1>
      <ReactMarkdown
        plugins={[gfm]}
        children={about.body}
        className={styles.body}
      />
    </div>
  );
};

export default AboutPage;
