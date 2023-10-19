import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";

const PricingSection = () => {
  

  const { totalItems, totalPrice } = useCheckout();
  return (
    <div className="pricing-section-container">
      <section className="pricing-section">
        <h4>
          price details{" "}
          <span>
            ({totalItems} {totalItems > 1 ? "items" : "item"})
          </span>
        </h4>
        <Divider />
        <span>
          <p>Total MRP (Inc. of Taxes)</p>
          <p>&#8377;{totalPrice}</p>
        </span>
        <span>
          <p>Shipping</p>
          <p style={{ color: "#49BA49" }}>
            <i>Free</i>
          </p>
        </span>
        <span>
          <p>Cart Total</p>
          <p>&#8377;{totalPrice}</p>
        </span>
      </section>
      <section className="checkout-action">
        <p>
          <span>Total Amount</span>
          <span>&#8377;{totalPrice}</span>
        </p>
        <button>
          <Link to={"/checkout/shipping"}>checkout securely</Link>
        </button>
      </section>
    </div>
  );
};

export default PricingSection;
