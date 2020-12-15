import React from "react";
import ArtIndexPage from "../../components/ArtIndexPage";
import { getArtIndex } from "../../helpers";
import styles from "../../styles/art.module.scss";

const Art = ({ artProjects }) => <ArtIndexPage artProjects={artProjects} />;

export const getStaticProps = async () => {
  const artProjects = await getArtIndex();
  return {
    revalidate: 50,
    props: {
      artProjects,
    },
  };
};

export default Art;
