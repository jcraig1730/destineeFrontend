import React from "react";
import styles from "./cartItem.module.scss";
import Image from "next/image";
import axios from "axios";
import { url } from "../../../helpers";
import Cookie from "js-cookie";
import LoadingSpinner from "../../LoadingSpinner";

const CartItem = ({ item, cartId, cart, updateQuantity, removeItem }) => {
  const price = (item.item.price * item.quantity).toFixed(2);
  return (
    <div className={styles.cartItem}>
      <h4>{item.item.title}</h4>
      <div className={styles.imageWrapper}>
        <Image
          src={item.item.mainImage?.formats?.thumbnail?.url}
          height={100}
          width={100}
          placeholder={<LoadingSpinner />}
        />
        <div className={styles.btnWrapper}>
          <button
            className={styles.btn}
            onClick={() => removeItem(item, cartId)}
          >
            Remove
          </button>
          {/* <div>Qty: {item.quantity}</div> */}
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.title}>Price</div>
          <div className={styles.price}>${item.item.price}</div>
        </div>
        <div className={styles.quantity}>
          <div>Qty</div>
          <div className={styles.qtyWrapper}>
            <button onClick={() => updateQuantity(item, item.quantity - 1)}>
              -
            </button>
            <div>{item.quantity}</div>
            <button onClick={() => updateQuantity(item, item.quantity + 1)}>
              +
            </button>
          </div>
        </div>
        <div>
          <div>Total</div>
          <div>${price}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
