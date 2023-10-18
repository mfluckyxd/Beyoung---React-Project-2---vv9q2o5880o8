import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";

const headers = headerWithJWT();
export const addItemToCart = async (id, qty) => {
  
  try {
    const res = await axios.post(
      `${apiURL}/ecommerce/cart/${id}`,
      { quantity: qty },
      headers
    );

    return res;
  } catch (error) {
    return error
  }
};


export const getCartItems = async ()=>{
  try {
    const res = await axios.get(
      `${apiURL}/ecommerce/cart/`,
      headers
    );

    return res;
  } catch (error) {
    return error
  }
}

export const getnumberOfCartItems = async ()=>{
  try {
    const res = await getCartItems();
    // console.log(res);
    return res.data.results
  } catch (error) {
    console.log(error);
  }
}

export const syncCartItems = async (updateCartNumbers)=>{
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  console.log(cartItems);
  if (cartItems.length>0) {
    cartItems.map(({id,qty})=>(
        addItemToCart(id,qty)
    ))
    localStorage.setItem('cartItems', JSON.stringify([]))
  }
  const numsOfCartItems = await getnumberOfCartItems()
  updateCartNumbers(numsOfCartItems)
}

