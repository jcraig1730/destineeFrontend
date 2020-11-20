import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/order.module.scss";
import OrderDetailPage from "../../components/OrderDetailPage";
import Cookie from "js-cookie";
import { url } from "../../helpers";

const OrderDetail = (props) => {
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    (async () => {
      const urlParts = window.location.pathname.split("/");
      const id = urlParts[urlParts.length - 1];
      const result = await axios.get(url + "/sales-orders/" + id, {
        headers: { Authorization: Cookie.get("token") },
      });
      setOrderDetails(result.data);
    })();
  }, []);
  if (orderDetails) return <OrderDetailPage orderDetails={orderDetails} />;
  return <div>spinner</div>;
};

export default OrderDetail;
