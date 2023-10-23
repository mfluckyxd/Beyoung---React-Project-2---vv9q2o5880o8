import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteItemFromCart } from "../../utils/cartAPI";
import {
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
} from "../../context/CartItemNumbersContext";
import { toast } from "react-toastify";
import { addToFavAPI } from "../../utils/wishListAPI";
import { useCheckout } from "../../context/CheckoutContext";
import { useLoader } from "../../context/LoaderContext";

const CartItemCard = ({ product, removeProductFromState }) => {

  // console.log(product);
  const {
    product: { _id, name, displayImage, price },
    quantity,
  } = product;
  

  const { updateTotalItems, updateTotalPrice } = useCheckout();

  const [qty, setQty] = useState(quantity);

  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers();

  const {updateLoaderStatus} = useLoader()

  const handleQtyChange = (event) => {
    const newQuantity = event.target.value;
    setQty(newQuantity);
  };
  const removeItemFromCart = async (_id) => {
    try {
      updateLoaderStatus(true)
      const res = await deleteItemFromCart(_id);
      // console.log(res);
      if (res.status === "success") {
        removeProductFromState(_id);
        updateTotalItems(res.data.items.length);
        updateCartNumbers(res.data.items.length);
        updateTotalPrice(res.data.totalPrice);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      updateLoaderStatus(false)
    }
  };
  const moveToWishlist = async (id) => {
    const body = {
      productId: id,
    };
    try {
      updateLoaderStatus(true)
      removeItemFromCart(id);

      const res = await addToFavAPI(body);
      // console.log(res);
      if (res.status === "success") {
        toast.success(res.message);
        updateWishlistNumbers(res.results);
      } else if (res.status === "fail") {
        toast.error(res.message);
      }
    } catch (error) {

    }finally{
      updateLoaderStatus(false)
    }
  };

  return (
    <div className="cart-item-card">
      <section className="cart-item-content">
        <div className="cart-item-img">
          <Link to={`/products/${_id}`}>
            <img src={displayImage} alt={name} />
          </Link>
        </div>
        <div className="cart-item-details">
          <p>
            {" "}
            <Link to={`/products/${_id}`}>{name}</Link>
          </p>
          <p>&#8377;{price}</p>
          <div className="cart-item-qty">
            <label htmlFor="quantity">QTY:</label>
            <select
              name="quantity"
              id="quantity"
              value={qty}
              onChange={handleQtyChange}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <Divider />
      <section className="cart-action-btns">
        <button
          onClick={() => removeItemFromCart(_id)}
          style={{ borderRight: "1px solid #E6E6E6" }}
        >
          Remove
        </button>
        <button onClick={() => moveToWishlist(_id)}>Move To Wishlist</button>
      </section>
    </div>
  );
};

export default CartItemCard;
