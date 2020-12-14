import React from "react";
import styles from "./textInput.module.scss";

const TextInput = ({ inputFor, value, handleChange, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="inputFor">
        {inputFor}
      </label>
      <input
        className={styles.input}
        id={inputFor}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type="text"
      />
    </div>
  );
};

export default TextInput;
