import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";

export const addItemToCart = async (id, qty) => {
  const headers = headerWithJWT();
  
  try {
    const res = await axios.patch(
      `${apiURL}/ecommerce/cart/${id}`,
      { quantity: qty },
      headers
    );
    

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCartItems = async () => {
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/cart/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getnumberOfCartItems = async () => {
  try {
    const res = await getCartItems();
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id) => {
  const headers = headerWithJWT();
  try {
    const res = await axios.delete(
      `${apiURL}/ecommerce/cart/${id}`,
      headers
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};