import React from "react";
import AboutPage from "../components/AboutPage";
import { getAboutPage } from "../helpers";
import styles from "../styles/about.module.scss";

const About = ({ about }) =>
  about ? <AboutPage about={about} /> : <div>Loading</div>;

export const getStaticProps = async () => {
  const about = await getAboutPage();
  return {
    revalidate: 60,
    props: {
      about,
    },
  };
};

export default About;
