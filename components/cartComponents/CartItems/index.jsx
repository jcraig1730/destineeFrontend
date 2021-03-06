import React, { useEffect } from "react";
import styles from "./cart.module.scss";
import CartItem from "../CartItem";
import axios from "axios";
import { url } from "../../../helpers";
import Cookie from "js-cookie";

const CartItems = ({ cart, cartId, removeItem, updateQuantity }) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      {cart.map((item) => {
        return (
          <div>
            <CartItem
              item={item}
              cartId={cartId}
              cart={cart}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
