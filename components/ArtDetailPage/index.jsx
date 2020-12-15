import Image from "next/image";
import React from "react";
import styles from "./artDetailPage.module.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const ArtDetailPage = ({ project }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headline}>{project.title}</h1>
      <div className={styles.imageWrapper}>
        <Image
          src={project.coverImage.url}
          height={project.coverImage.height}
          width={project.coverImage.width}
          layout="responsive"
        />
      </div>
      <ReactMarkdown
        plugins={[gfm]}
        children={project.body}
        allowDangerousHtml={true}
        className={styles.body}
      />
    </div>
  );
};

export default ArtDetailPage;
