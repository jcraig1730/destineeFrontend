import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AccountPage from "../components/AccountPage";
import axios from "axios";
import { url } from "../helpers";
import Cookie from "js-cookie";

const updateableFields = [
  "address",
  "city",
  "firstName",
  "lastName",
  "phone",
  "state",
  "zip",
];

const Account = ({ userData, dispatch }) => {
  const [isError, setIsError] = useState("");
  const [userDataFields, setUserDataFields] = useState({});

  useEffect(() => {
    const fields = Object.keys(userData)
      .filter((key) => updateableFields.includes(key))
      .map((key) => {
        return {
          [key]: userData[key] || "",
        };
      });

    setUserDataFields(fields);
  }, []);

  const createUpdateObject = () => {
    const payload = userDataFields.reduce((obj, field) => {
      obj = { ...obj, ...field };
      return obj;
    }, {});
    return payload;
  };

  const updateDataFieldValue = (e) => {
    const updatedFieldValues = [...userDataFields];
    const target = updatedFieldValues.find(
      (i) => Object.keys(i)[0] === e.target.id
    );
    target[e.target.id] = e.target.value;
    setUserDataFields(updatedFieldValues);
  };

  const updateDatabase = async () => {
    const updatedUserData = createUpdateObject();
    const result = await axios.put(
      `${url}/users/${userData.id}`,
      updatedUserData,
      { headers: { Authorization: Cookie.get("token") } }
    );
    return result.data;
  };

  const updateState = () => {
    const payload = createUpdateObject();
    dispatch({
      type: "UPDATE_USERDATA",
      payload,
    });
  };

  const updateStateAndDb = async () => {
    const dbResult = await updateDatabase();
    if (dbResult.status !== 200)
      return setIsError(
        "Could not connect to server to update profile, please try again later"
      );
    updateState();
  };
  return (
    <AccountPage
      userData={userData}
      updateDataFieldValue={updateDataFieldValue}
      dataFieldValues={userDataFields}
      save={updateStateAndDb}
    />
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(Account);
