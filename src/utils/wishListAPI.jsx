import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";

export const addToFavAPI = async (body) => {
  const headers = headerWithJWT();

  try {
    const res = await axios.patch(
      `${apiURL}/ecommerce/wishlist`,
      body,
      headers
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const getWishlistItems = async () => {
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/wishlist/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const removeFromWishlist = async (id) => {
  const headers = headerWithJWT();
  try {
    const res = await axios.delete(`${apiURL}/ecommerce/wishlist/${id}`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getnumberOfWishlistItems = async ()=>{
    try {
      const res = await getWishlistItems();
      return res.results
    } catch (error) {
     console.log(error);
    }
  }