import React from "react";
import ItemList from "../ItemList";
import styles from "./categoryList.module.scss";

const CategoryList = ({ categories }) => {
  return categories.map((category) => {
    return (
      <div className={styles.categories} key={category.title}>
        <h3 className={styles.title}>
          {category.items.length ? category.title : ""}
        </h3>
        <ItemList items={category.items} />
      </div>
    );
  });
};

export default CategoryList;
