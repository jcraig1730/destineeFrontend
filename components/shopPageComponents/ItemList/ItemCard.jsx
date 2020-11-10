import React from "react";
import styles from "./itemList.module.scss";
import Image from "next/image";
import Link from "next/link";

const ItemCard = ({ title, price, description, mainImage, id }) => {
  const {
    formats: { thumbnail },
  } = mainImage;
  return (
    <Link href={`/shop/${id}`}>
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
    </Link>
  );
};

export default ItemCard;
