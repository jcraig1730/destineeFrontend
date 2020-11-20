import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";

import CartModalBody from "./CartModal";

const CartModal = (props) => {
  const removeItem = (item) => {
    const updatedCart = props.cart?.filter(
      (curItem) => curItem.item.id !== item.item.id
    );
    props.dispatch({ type: "UPDATE_CART", payload: updatedCart });
  };

  const updateQuantity = (item, quantity) => {
    const updatedCart = props.cart?.map((curItem) => {
      if (curItem.item.id !== item.item.id) return curItem;
      curItem.quantity =
        quantity < 0
          ? 0
          : quantity > item.item.quantity
          ? item.item.quantity
          : quantity;
      return curItem;
    });
    props.dispatch({ type: "UPDATE_CART", payload: updatedCart });
  };
  return (
    <Modal close={props.closeModal}>
      <CartModalBody
        cart={props.cart}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartModal);
