import React from "react";
import TextInput from "./TextInput";
import styles from "./contactInfo.module.scss";

const ContactInfo = ({ dataFieldValues, updateDataFieldValue, save }) => {
  return (
    <div className={styles.wrapper}>
      {dataFieldValues.map &&
        dataFieldValues.map((keyValuePair) => {
          const key = Object.keys(keyValuePair);
          return (
            <TextInput
              handleChange={updateDataFieldValue}
              inputFor={key}
              placeholder={keyValuePair[key]}
              value={keyValuePair[key]}
              key={key}
              save={save}
            />
          );
        })}

      <button
        className={styles.save}
        onClick={() => {
          save();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ContactInfo;
