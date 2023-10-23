import React, { useEffect, useState } from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import CartItems from "./CartItems";
import PricingSection from "../checkout/PricingSection";
import "../../styles/cart.css";
import { getCartItems } from "../../utils/cartAPI";
import EmptyCart from "./EmptyCart";
import { useCheckout } from "../../context/CheckoutContext";
import { useLoader } from "../../context/LoaderContext";

const CartComponent = () => {
  const { products, updateProducts, updateTotalItems, updateTotalPrice } =
    useCheckout();
    const {updateLoaderStatus} = useLoader()
    

  const fetchProducts = async () => {
    
    try {
      updateLoaderStatus(true)
      
      const res = await getCartItems();
      // console.log(res.data);
      const { items, totalPrice } = res.data;
      console.log(items);
      
      updateProducts(items);
      updateTotalPrice(totalPrice);
      updateTotalItems(items.length);
    } catch (error) {
      console.log(error);
    }finally{
      updateLoaderStatus(false)
      // console.log(products);
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
