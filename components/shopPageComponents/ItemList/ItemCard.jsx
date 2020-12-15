import React from "react";
import styles from "./itemList.module.scss";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../../LoadingSpinner";

const ItemCard = ({ title, price, description, mainImage, id }) => {
  return (
    <Link href={`/shop/${id}`}>
      <div className={styles.itemCard}>
        {mainImage ? (
          <div className={styles.imgWrapper}>
            <Image
              src={mainImage?.formats?.thumbnail?.url}
              width={mainImage?.formats?.thumbnail?.width}
              height={mainImage?.formats?.thumbnail?.height}
              layout="fixed"
              placeholder={<LoadingSpinner />}
            />
          </div>
        ) : null}
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.price}>${price.toFixed(2)}</div>
      </div>
    </Link>
  );
};

export default ItemCard;
