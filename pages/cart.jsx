import React from "react";
import { connect } from "react-redux";
import CartContent from "../components/cartComponents/CartContent";

const Cart = ({ cart, userData, dispatch }) => {
  const removeItem = (item) => {
    const updatedCart = cart.filter(
      (curItem) => curItem.item.id !== item.item.id
    );
    dispatch({ type: "UPDATE_CART", payload: updatedCart });
  };

  const updateQuantity = (item, quantity) => {
    const updatedCart = cart.map((curItem) => {
      if (curItem.item.id !== item.item.id) return curItem;
      curItem.quantity =
        quantity < 0
          ? 0
          : quantity > item.item.quantity
          ? item.item.quantity
          : quantity;
      return curItem;
    });
    dispatch({ type: "UPDATE_CART", payload: updatedCart });
  };
  return (
    <CartContent
      cart={cart}
      cartId={userData.cart?.id}
      user={userData.username}
      removeItem={removeItem}
      updateQuantity={updateQuantity}
    />
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  userData: state.userData,
});

export default connect(mapStateToProps)(Cart);
