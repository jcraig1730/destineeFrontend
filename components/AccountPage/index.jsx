import React from "react";
import styles from "./accountPage.module.scss";
import ContactInfo from "./ContactInfo";
// import FavoriteInfo from "./FavoriteInfo";
import Cookie from "js-cookie";
import OrderInfo from "./OrderInfo";

const AccountPage = ({
  userData,
  updateDataFieldValue,
  dataFieldValues,
  save,
}) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          Cookie.remove("token");
          location.replace("/");
        }}
      >
        Logout
      </button>

      <h2>Shipping and Contact</h2>
      <ContactInfo
        updateDataFieldValue={updateDataFieldValue}
        dataFieldValues={dataFieldValues}
        save={save}
      />

      <h2>Order History</h2>
      <OrderInfo orders={userData.orders} />

      {/* <h2>Your Favorites</h2>
      <FavoriteInfo favorites={userData.favorites} /> */}
    </div>
  );
};

export default AccountPage;
