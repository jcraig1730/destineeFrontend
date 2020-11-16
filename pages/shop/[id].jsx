import { getItems, getItem, url } from "../../helpers";
import styles from "../../styles/itemDetail.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";

const ItemDetail = (props) => {
  const { item } = props;
  const router = useRouter();

  return (
    <div className={styles.itemDetail}>
      <button className={styles.back} onClick={() => router.back()}>
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        Back
      </button>
      {item?.mainImage ? (
        <div className={styles.imageWrapper}>
          <Image
            src={item?.mainImage.url}
            width={item?.mainImage.width}
            height={item?.mainImage.height}
          />
        </div>
      ) : null}
      <div className={styles.info}>
        <div className={styles.title}>{item?.title}</div>
        <div className={styles.price}>${item?.price.toFixed(2)}</div>
        <button
          onClick={() => {
            const updatedCart = [...props.state.cart];
            const inCart = updatedCart.find((el) => el.id === item.id);
            if (inCart) {
              inCart.quantity += 1;
            } else {
              updatedCart.push({ id: item.id, quantity: 1, item });
            }
            if (props.state.isAuthenticated) {
              axios.put(
                `${url}/carts/${props.state.userData.cart.id}`,
                { items: updatedCart },
                { headers: { Authorization: Cookie.get("token") } }
              );
            }
            props.dispatch({
              type: "UPDATE_CART",
              payload: updatedCart,
            });
          }}
          className={styles.btn}
        >
          Add{" "}
          <span className={styles.cartIcon}>
            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
          </span>
        </button>
        <div className={styles.description}>{item?.description}</div>
      </div>
      {item?.images.length > 0 ? (
        <div className={styles.imagesWrapper}>
          {item?.images.map((image) => (
            <div className={styles.thumbnail}>
              <Image
                src={image.formats.medium?.url || image.formats.thumbnail.url}
                width={400}
                height={400}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const getStaticPaths = async () => {
  const items = await getItems();
  return {
    paths: items.map((item) => `/shop/${item.id}`),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const item = await getItem(params.id);
  return {
    revalidate: 60,
    props: {
      item,
    },
  };
};

export default connect((state) => ({ state }))(ItemDetail);
