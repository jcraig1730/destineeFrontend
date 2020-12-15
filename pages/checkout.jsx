import React, { useState, useEffect } from "react";
import styles from "../styles/checkout.module.scss";
import { connect } from "react-redux";
import StripeCheckout from "../components/checkoutComponents/StripeCheckout";
import axios from "axios";
import { getSubtotal, getTax, getTotal, url } from "../helpers";
import Cookie from "js-cookie";
import AddressInfo from "../components/checkoutComponents/AddressInfo";
import { useRouter } from "next/router";
import ConfirmOrder from "../components/checkoutComponents/ConfirmOrder";

const Checkout = ({ isAuthenticated, user, cart, shipping, dispatch }) => {
  const addressInfo = {
    name: `${user.firstName} ${user.lastName}` || "",
    address: user.address || "",
    city: user.city || "",
    zip: user.zip || "",
    state: user.state || "",
  };
  const [stage, setStage] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({ ...addressInfo });
  const [shippingErrors, setShippingErrors] = useState({});
  const [billingInfo, setBillingInfo] = useState({ ...addressInfo });
  const [billingErrors, setBillingErrors] = useState({});

  const [clientSecret, setClientSecret] = useState("");

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

  useEffect(() => {
    (async () => {
      const result = await axios.post(
        url + "/sales-orders/create-payment-intent",
        {
          items: cart,
          total: getTotal(cart, shipping),
        },
        { headers: { Authorization: Cookie.get("token") } }
      );
      if (!result.data?.clientSecret) {
        setError("Something went wrong, please try again later");
        return;
      }
      setClientSecret(result.data.clientSecret);
    })();
  }, []);

  const verifyInformation = () => {
    const errors = Object.keys(billingInfo).reduce((errObj, dataPoint) => {
      if (!billingInfo[dataPoint]) errObj[dataPoint] = true;
      return errObj;
    }, {});
    if (Object.keys(errors).length > 0) {
      setBillingErrors(errors);
      return true;
    }
    setBillingErrors({});
    return null;
  };

  const submitOrder = async (paymentId) => {
    const payload = {
      shippingAddress: shippingInfo,
      billingAddress: billingInfo,
      user,
      items: cart,
      total: getTotal(cart, shipping),
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

    router.push("/orders/" + order.id);
  };

  const stages = [
    <AddressInfo
      title="Shipping Information"
      total={getTotal(cart, shipping)}
      subtotal={getSubtotal(cart)}
      tax={getTax(cart)}
      data={shippingInfo}
      errors={shippingErrors}
      handleDataChange={handleShippingChange}
      nextButtonTitle={`Next`}
      nextButtonClick={(e) => {
        e.preventDefault();
        const errors = Object.keys(shippingInfo).reduce((errObj, dataPoint) => {
          if (!shippingInfo[dataPoint]) errObj[dataPoint] = true;
          return errObj;
        }, {});
        if (Object.keys(errors).length > 0) {
          return setShippingErrors(errors);
        }
        setShippingErrors({});
        setStage(stage + 1);
        window.scrollTo(0, 0);
      }}
    />,
    <StripeCheckout
      billingInfo={billingInfo}
      billingErrors={billingErrors}
      handleChange={handleBillingChange}
      cart={cart}
      user={user}
      submitOrder={submitOrder}
      prevPage={() => {
        setStage(stage - 1);
        window.scrollTo(0, 0);
      }}
      tax={getTax(cart)}
      subtotal={getSubtotal(cart)}
      total={getTotal(cart, shipping)}
      clientSecret={clientSecret}
      verifyInformation={verifyInformation}
    />,
    <ConfirmOrder
      billingAddress={billingInfo}
      shippingAddress={shippingInfo}
      total={getTotal(cart, shipping)}
      orderDetails={cart}
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
