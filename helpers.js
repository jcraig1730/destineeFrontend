import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const url =
  process.env.NODE_ENV === "production"
    ? "https://ryormy.com"
    : "http://localhost:1337";

export const getHomePage = async () => {
  const pageContents = await axios.get(`${url}/home`);
  return pageContents.data;
};

export const getShopContent = async () => {
  const shopContents = await axios.get(`${url}/categories`);
  return shopContents.data;
};

export const getItems = async () => {
  const items = await axios.get(`${url}/items`);
  return items.data;
};

export const getItem = async (id) => {
  const item = await axios.get(`${url}/items/${id}`);
  return item.data;
};

export const getSubtotal = (cart) => {
  return Number(
    cart
      .reduce((total, item) => total + item.quantity * item.item.price, 0)
      .toFixed(2)
  );
};

export const getTax = (cart) => {
  return Number((getSubtotal(cart) * 0.0825).toFixed(2));
};

export const getTotal = (cart, shipping = 0) => {
  return Number((getSubtotal(cart) + getTax(cart) + shipping).toFixed(2));
};

export const getArtIndex = async () => {
  const artProjects = await axios.get(`${url}/arts`);
  return artProjects.data;
};

export const getArtDetail = async (id) => {
  const { data } = await axios.get(`${url}/arts/${id}`);
  return data;
};

export const getAboutPage = async () => {
  const { data } = await axios.get(`${url}/about`);
  return data;
};
