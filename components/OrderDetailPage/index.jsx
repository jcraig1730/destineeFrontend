import React from "react";
import styles from "./orderDetailPage.module.scss";

import CartItems from "../cartComponents/CartItems";

const OrderDetailPage = (props) => {
  return (
    <div className={styles.orderDetail}>
      <div className={styles.message}>Your order has been placed!</div>
      <div className={styles.orderId}>Order ID: {props.orderDetails?.id}</div>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.itemTitle}>Item</div>
          <div className={styles.itemPrice}>Price Ea.</div>
          <div className={styles.itemQuantity}>Quantity</div>
          <div className={styles.itemTotal}>Total</div>
        </div>
        {props.orderDetails.items.map((item) => {
          return (
            <div className={styles.item} key={item.item.id}>
              <div className={styles.itemTitle}>{item.item.title}</div>
              <div className={styles.itemPrice}>${item.item.price}</div>
              <div className={styles.itemQuantity}>{item.quantity}</div>
              <div className={styles.itemTotal}>
                {item.quantity * item.item.price}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.totals}>
        <div className={styles.subtotal}>
          Subtotal: ${props.orderDetails.subtotal}
        </div>
        <div className={styles.shipping}>
          Shipping: ${props.orderDetails.shipping}
        </div>
        <div className={styles.tax}>Tax: ${props.orderDetails.tax}</div>
        <div className={styles.total}>Total: ${props.orderDetails.total}</div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
