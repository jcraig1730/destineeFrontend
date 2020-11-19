import React, { useState, useEffect } from "react";
import styles from "../styles/checkout.module.scss";
import { connect } from "react-redux";
import StripeCheckout from "../components/checkoutComponents/StripeCheckout";
import axios from "axios";
import { getSubtotal, getTax, getTotal, url } from "../helpers";
import Cookie from "js-cookie";
import AddressInfo from "../components/checkoutComponents/AddressInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const addressInfo = { name: "", address: "", city: "", zip: "", state: "" };

const Checkout = ({ isAuthenticated, user, cart, shipping, dispatch }) => {
  const [stage, setStage] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({ ...addressInfo });
  const [billingInfo, setBillingInfo] = useState({ ...addressInfo });
  const router = useRouter();
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
  };
  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(url + "/connect/google");
    }
  }, []);

  const submitOrder = async (paymentId) => {
    const payload = {
      shippingAddress: shippingInfo,
      billingAddress: billingInfo,
      user,
      items: cart,
      total: getTotal(cart),
      subtotal: getSubtotal(cart),
      tax: getTax(cart),
      shipping: shipping || 0,
      paymentId,
    };

    const result = await axios.post(url + "/sales-orders", payload, {
      headers: { Authorization: Cookie.get("token") },
    });

    const order = result.data;

    dispatch({ type: "UPDATE_CART", payload: [] });

    // router.push("/orders/" + order.id);
  };

  const stages = [
    <AddressInfo
      title="Shipping Information"
      data={shippingInfo}
      handleDataChange={handleShippingChange}
      nextButtonTitle={`Next`}
      nextButtonClick={() => {
        setStage(stage + 1);
        // window.scrollTo(0, 0);
      }}
    />,
    <StripeCheckout
      billingInfo={billingInfo}
      handleChange={handleBillingChange}
      cart={cart}
      user={user}
      submitOrder={submitOrder}
      prevPage={() => setStage(stage - 1)}
      total={getTotal(cart, shipping)}
    />,
  ];
  return (
    <div className={styles.checkout}>
      <h1 className={styles.header}>checkout</h1>
      {stages[stage]}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.userData,
  cart: state.cart,
});

export default connect(mapStateToProps)(Checkout);
