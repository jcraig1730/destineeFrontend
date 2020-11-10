import React from "react";
import ItemCard from "./ItemCard";
import styles from "./itemList.module.scss";

const ItemList = ({ items }) => {
  return (
    <div className={styles.itemList}>
      {items.map((item) => (
        <ItemCard {...item} key={`item-${item.id}`} />
      ))}
    </div>
  );
};

export default ItemList;
