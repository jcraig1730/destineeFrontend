import React from "react";
import styles from "./cartModal.module.scss";
import Link from "next/link";

import CartItems from "../cartComponents/CartItems";

const CartModalBody = (props) => {
  return (
    <div className={styles.cartModal}>
      <button className={styles.close} onClick={props.closeModal}>
        X
      </button>
      <div className={styles.cart}>
        <h3 className={styles.headline}>Your Cart</h3>
        <CartItems
          cart={props.cart}
          removeItem={props.removeItem}
          updateQuantity={props.updateQuantity}
        />
      </div>
      <Link onClick={props.closeModal} href={"/checkout"}>
        <button className={styles.checkout} onClick={props.closeModal}>
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartModalBody;
