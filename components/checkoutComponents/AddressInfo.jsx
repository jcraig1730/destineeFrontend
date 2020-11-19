import React from "react";
import styles from "./checkout.module.scss";

const AddressInfo = ({
  title,
  data,
  handleDataChange,
  nextButtonTitle,
  nextButtonClick,
  nextButtonAcive,
  prevButtonTitle,
  prevButtonClick,
  nextLoading,
  prevLoading,
  children,
}) => {
  const sections = Object.keys(data);

  return (
    <form className={styles.addressInfo}>
      <div className={styles.headline}>{title}</div>
      {sections.map((section) => {
        return (
          <div key={`${title} ${section}`}>
            <label htmlFor={section}>{section}</label>
            <input
              onChange={handleDataChange}
              id={section}
              value={data[section]}
              type="text"
            />
          </div>
        );
      })}
      {children}
      <div className={styles.buttons}>
        {prevButtonTitle && prevButtonClick && (
          <button className={styles.btnLeft} onClick={prevButtonClick}>
            {prevLoading ? "spinner" : prevButtonTitle}
          </button>
        )}

        {nextButtonTitle && nextButtonClick && (
          <button
            disabled={nextButtonAcive}
            className={styles.btnRight}
            onClick={nextButtonClick}
            {...(() =>
              nextButtonAcive ? { style: { background: "grey" } } : {})()}
          >
            {nextLoading ? "spinner" : nextButtonTitle}
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressInfo;
