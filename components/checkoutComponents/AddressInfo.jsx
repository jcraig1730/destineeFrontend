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
  errors,
  children,
  subtotal,
  tax,
  total,
}) => {
  const sections = Object.keys(data);

  return (
    <form className={styles.addressInfo}>
      <div className={styles.headline}>{title}</div>
      <div className={styles.inputWrapper}>
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
              {errors[section] && <span>*</span>}
              {errors[section] && (
                <div className={styles.err}>{section} is a required field</div>
              )}
            </div>
          );
        })}
        {children}
      </div>
      <div className={styles.totals}>
        <div>Subtotal</div>
        <div>${subtotal}</div>
        <div>Tax</div>
        <div>${tax}</div>
        <div>Total</div>
        <div>${total}</div>
      </div>
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
