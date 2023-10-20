import { Divider } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { toast } from "react-toastify";

const PricingSection = () => {
  
  const { totalItems, totalPrice,checkoutAddress,paymentValid, products } = useCheckout();

  const navigate = useNavigate()



  const location = useLocation();
  const currentRoute = location.pathname.split('/');
  const currentPage = currentRoute[currentRoute.length - 1];
 
  const handleCheckout = (e)=>{
    e.preventDefault();
    if (currentPage==='cart') {
      navigate('/checkout/shipping')
    }else if(currentPage==='shipping'){
      if (Object.keys(checkoutAddress).length) {
        console.log(checkoutAddress);
        navigate('/checkout/payment')
      }else{
        toast.error('Please verify your address again!')
      }
      
    }else if(currentPage==='payment') {
      if (paymentValid) {
        alert('order Placed')
      }
      else{
        toast.error('Please verify your payment details again!')
      }
    }
  }

  
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
        <button onClick={handleCheckout}>
          checkout securely
        </button>
      </section>
    </div>
  );
};

export default PricingSection;
