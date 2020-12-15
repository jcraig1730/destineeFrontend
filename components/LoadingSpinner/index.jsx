import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./loadingSpinner.module.scss";

const spinnerStyle = {
  fontSize: "2em",
};

const LoadingSpinner = ({ color, fontSize }) => {
  const customStyles = {};
  if (color) customStyles.color = color;
  if (fontSize) customStyles.fontSize = fontSize;
  return (
    <FontAwesomeIcon
      style={customStyles}
      className={styles.spinner}
      icon={["fas", "spinner"]}
    />
  );
};

export default LoadingSpinner;
