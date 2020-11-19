import React, { useEffect } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import axios from "axios";
import { url } from "../../helpers";
import Layout from "./Layout";

const LogicWrapper = (props) => {
  useEffect(() => {
    (async () => {
      const token = Cookie.get("token");
      if (token) {
        const user = await axios.get(url + "/users/me", {
          headers: { Authorization: token },
        });
        if (user.data) {
          console.log(user.data.cart);
          console.log(props.dispatch);
          props.dispatch({ type: "LOGIN_USER", payload: user.data });
        }
      }
    })();
  }, []);

  return <Layout user={props.user} cart={props.cart} />;
};

const mapStateToProps = (state) => ({
  user: state.userData,
  cart: state.cart,
});

export default connect(mapStateToProps)(LogicWrapper);
