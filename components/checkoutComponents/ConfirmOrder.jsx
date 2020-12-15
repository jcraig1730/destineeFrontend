import React from "react";
import styles from "./checkout.module.scss";

const ConfirmOrder = ({ shippingAddress, billingAdderss, orderDetails }) => {
  return (
    <div className={styles.addressInfo}>
      <div className={styles.headline}>Review and Confirm</div>

      <div className={styles.buttons}>
        <button className={styles.btnLeft}>Back</button>
        <button className={styles.btnRight}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
