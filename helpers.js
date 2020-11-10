import axios from "axios";

const url = "http://localhost:1337";

export const getHomePage = async () => {
  const pageContents = await axios.get(`${url}/home`);
  return pageContents.data;
};
