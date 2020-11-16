import React from "react";
import styles from "./cart.module.scss";
import CartItems from "../CartItems";

const CartContent = ({ cart, cartId, removeItem, updateQuantity, user }) => {
  const subtotal = cart.reduce(
    (total, item) => (total += item.item.price * item.quantity),
    0
  );
  const tax = subtotal * 0.0825;
  const total = tax + subtotal;
  return (
    <div className={styles.cart}>
      <h1 className={styles.header}>
        {user && `${user.slice(0, 1).toUpperCase() + user.slice(1)}'s `}Cart
      </h1>
      <div className={styles.content}>
        <div className={styles.itemsWrapper}>
          <CartItems
            cart={cart}
            cartId={cartId}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        </div>
        <div className={styles.amountWrapper}>
          <div className={styles.subtotal}>
            <div>Subtotal</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <div className={styles.tax}>
            <div>Tax</div>
            <div>${tax.toFixed(2)}</div>
          </div>
          <div className={styles.total}>
            <div>Total</div>
            <div>${total.toFixed(2)}</div>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
