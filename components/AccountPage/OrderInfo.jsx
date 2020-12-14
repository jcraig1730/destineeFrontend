import React from "react";
import styles from "./orderInfo.module.scss";
import Link from "next/link";

const OrderInfo = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <div>You don't have any orders yet</div>;
  }
  return (
    <div className={styles.col}>
      <div className={styles.row}>
        <div>Date</div>
        <div>Order #</div>
        <div>Total</div>
      </div>
      {orders?.map((order) => {
        const orderDate = new Date(order.created_at).toLocaleDateString();
        return (
          <Link href={`/orders/${order.id}`} passHref>
            <div className={styles.row}>
              <div>{orderDate}</div>
              <div>{order.id}</div>
              <div>${order.total}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default OrderInfo;
