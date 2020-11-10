import styles from "../styles/Home.module.scss";
import { getHomePage } from "../helpers";

import LandingBanner from "../components/homePageComponents/LandingBanner/index";
import LandingLinks from "../components/homePageComponents/LandingLinks";

export default function Home({ pageContent }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <LandingBanner
          headline={pageContent.mainHeadline}
          image={pageContent.mainImage}
        />
      </div>
      <div className={styles.links}>
        <LandingLinks
          shop={pageContent.shop}
          art={pageContent.art}
          about={pageContent.about}
        />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const pageContent = await getHomePage();
  return {
    revalidate: 60,
    props: {
      pageContent,
    },
  };
};
