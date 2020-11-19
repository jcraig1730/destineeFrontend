import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { url } from "../../helpers";
import axios from "axios";
import AddressInfo from "./AddressInfo";
import styles from "./checkout.module.scss";

export default function CheckoutForm({
  total,
  cart,
  submitOrder,
  billingInfo,
  prevPage,
  handleBillingChange,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    (async () => {
      const result = await axios.post(
        url + "/sales-orders/create-payment-intent",
        {
          items: cart,
          total,
        }
      );
      if (!result.data?.clientSecret) {
        setError("Something went wrong, please try again later");
        return;
      }
      setClientSecret(result.data.clientSecret);
    })();
  }, []);
  const cardStyle = {
    style: {
      base: {
        backgroundColor: "white",
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },

      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      submitOrder(payload.paymentIntent.id);
    }
  };
  return (
    <AddressInfo
      title={"Billing Information"}
      data={billingInfo}
      handleDataChange={handleBillingChange}
      nextButtonTitle="Submit Order"
      nextButtonClick={handleSubmit}
      nextButtonAcive={processing || disabled || succeeded}
      prevButtonTitle="Shipping"
      prevButtonClick={prevPage}
      nextLoading={processing}
    >
      <div className={styles.cardWrapper}>
        <label htmlFor="card-element">card</label>
        <CardElement
          id="card-element"
          onChange={handleChange}
          className={styles.card}
        />
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </div>
    </AddressInfo>
  );
}
