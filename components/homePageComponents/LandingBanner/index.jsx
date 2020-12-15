import React from "react";
import styles from "./landingBanner.module.scss";
import Image from "next/image";
import LoadingSpinner from "../../LoadingSpinner";

const LandingBanner = ({ headline, image }) => {
  return (
    <div className={styles.topLandingBanner}>
      <div className={styles.headline}>{headline}</div>
      <Image
        src={image.url}
        layout="intrinsic"
        width={image.width}
        height={image.height}
        placeholder={<LoadingSpinner />}
      />
    </div>
  );
};

export default LandingBanner;
