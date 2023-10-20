import React, { useEffect, useState } from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import CartItems from "./CartItems";
import PricingSection from "../checkout/PricingSection";
import "../../styles/cart.css";
import { getCartItems } from "../../utils/cartAPI";
import EmptyCart from "./EmptyCart";
import { useCheckout } from "../../context/CheckoutContext";

const CartComponent = () => {
  const { products, updateProducts, updateTotalItems, updateTotalPrice } =
    useCheckout();

  const fetchProducts = async () => {
    try {
      const res = await getCartItems();
      console.log(res.data);
      const { items, totalPrice } = res.data;
      updateProducts(items);
      updateTotalPrice(totalPrice);
      updateTotalItems(items.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <CheckoutHeader />
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="cart-container">
            <CartItems />
            <PricingSection />
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
