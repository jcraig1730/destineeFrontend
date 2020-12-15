import { getItems, getItem, url } from "../../helpers";
import styles from "../../styles/itemDetail.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import GenericModal from "../../components/GenericModal";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const ItemDetail = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
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
            placeholder={<LoadingSpinner />}
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
            if (!props.state.isAuthenticated) {
              return setShowLoginModal(true);
            }
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
            props.dispatch({ type: "SHOW_CART_MODAL" });
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
                placeholder={<LoadingSpinner />}
              />
            </div>
          ))}
        </div>
      ) : null}
      {showLoginModal && (
        <GenericModal>
          <div>
            <div
              style={{
                width: "fit-content",
                float: "right",
                marginTop: "-50px",
                cursor: "pointer",
              }}
              onClick={() => setShowLoginModal(false)}
            >
              X
            </div>
            <p>Please login to continue!</p>
            <p>
              <a
                style={{ textDecoration: "underline" }}
                href={`${url}/connect/google`}
                onClick={() => Cookie.set("prev", location.pathname)}
              >
                Click here to login or create an account
              </a>
            </p>
          </div>
        </GenericModal>
      )}
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
