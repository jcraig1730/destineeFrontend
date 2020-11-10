import React from "react";
import styles from "./itemList.module.scss";
import Image from "next/image";

const ItemCard = ({ title, price, description, mainImage }) => {
  const {
    formats: { thumbnail },
  } = mainImage;
  return (
    <div className={styles.itemCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={thumbnail.url}
          width={thumbnail.width}
          height={thumbnail.height}
          layout="fixed"
        />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.price}>${price}</div>
    </div>
  );
};

export default ItemCard;
