import axios from "axios";

export const url =
  process.env.NODE_ENV === "production"
    ? "http://167.172.136.197"
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
