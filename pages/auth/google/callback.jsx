import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../../../helpers";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { wrapper, State } from "../../../store";

const Auth = (props) => {
  const { token, user } = props;
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    Cookie.set("token", `${token}`);
    router.replace(Cookie.get("prev"));
  }, []);
  return <div>Loading</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    try {
      const { store } = context;
      const userData = await axios.get(`${url}${context.resolvedUrl}`);
      const token = `Bearer ${userData.data.jwt}`;
      const user = userData.data.user;
      store.dispatch({ type: "LOGIN_USER", payload: user });
      return { props: { token } };
    } catch (err) {
      console.log(err);
    }
  }
);

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(Auth);
