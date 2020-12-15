import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { url } from "../../helpers";
import axios from "axios";
import AddressInfo from "./AddressInfo";
import styles from "./checkout.module.scss";
import Cookie from "js-cookie";

export default function CheckoutForm({
  total,
  subtotal,
  tax,
  cart,
  submitOrder,
  billingInfo,
  prevPage,
  handleBillingChange,
  clientSecret,
  verifyInformation,
  billingErrors,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  // const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errors = verifyInformation();
    if (errors) return;
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
    <div>
      <AddressInfo
        title={"Billing Information"}
        data={billingInfo}
        handleDataChange={handleBillingChange}
        nextButtonTitle="Submit"
        nextButtonClick={handleSubmit}
        nextButtonAcive={processing || disabled || succeeded}
        prevButtonTitle="Shipping"
        prevButtonClick={prevPage}
        nextLoading={processing}
        errors={billingErrors}
        subtotal={subtotal}
        tax={tax}
        total={total}
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
        </div>
      </AddressInfo>
    </div>
  );
}
