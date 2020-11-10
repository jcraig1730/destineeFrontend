import React from "react";
import styles from "../styles/shop.module.scss";
import { getShopContent } from "../helpers";
import CategoryList from "../components/shopPageComponents/CategoryList";

const Shop = ({ categories }) => {
  return (
    <div className={styles.itemList}>
      <CategoryList categories={categories} />
    </div>
  );
};

export const getStaticProps = async () => {
  const categories = await getShopContent();
  return {
    revalidate: 60,
    props: {
      categories,
    },
  };
};

export default Shop;
