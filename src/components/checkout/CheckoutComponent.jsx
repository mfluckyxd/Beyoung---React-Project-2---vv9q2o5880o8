import React from "react";
import { useLocation } from 'react-router-dom';
import "../../styles/checkout.css";
import EmptyCart from "../cart/EmptyCart";
import { useCartNumbers } from "../../context/CartItemNumbersContext";
import CheckoutHeader from "./CheckoutHeader";
import { Outlet } from "react-router";
import PricingSection from "./PricingSection";

const CheckoutComponent = () => {
  const numberOfItemsInCart = useCartNumbers();

  

 
  return (
    <>
      
        <CheckoutHeader/>
        {numberOfItemsInCart === 0 ? (
          <EmptyCart />
        ) : (
          <div className="checkout-section">
            <Outlet/>
            {/* <PricingSection/> */}
            <section className="main-checkout-routes"></section>
            <section className="pricing-secion"></section>
          </div>
        )}
      
    </>
  );
};

export default CheckoutComponent;
