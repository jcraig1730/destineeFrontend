import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./artIndexPage.module.scss";

const ArtIndexPage = ({ artProjects }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headline}>Destinee's Art Blog</h1>
      {artProjects.map((project) => {
        return (
          <Link href={`/art/${project.id}`} passHref>
            <div className={styles.linkWrapper}>
              <div className={styles.imgWrapper}>
                <Image src={project.coverImage.url} height={100} width={100} />
              </div>
              <div className={styles.details}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArtIndexPage;
