import React from "react";
import styles from "./checkout.module.scss";
import CreditSection from "./CardSection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
  "pk_test_51HhP82Lj0IZawm0Nlp30B05j2v2HiCKmKoeXu62JEk4azbMOOLDod6N6iLSvFchwKgjMepyVIDBeaWeuacXBAcHs006Wkxgxap"
);

const StripeCheckout = ({
  billingInfo,
  handleChange,
  submitOrder,
  cart,
  user,
  total,
  prevPage,
}) => {
  return (
    <div>
      <Elements stripe={stripe}>
        <CreditSection
          billingInfo={billingInfo}
          handleBillingChange={handleChange}
          submitOrder={submitOrder}
          cart={cart}
          total={total}
          prevPage={prevPage}
        />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
