import { Divider } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { toast } from "react-toastify";
import { newOrder } from "../../utils/orderAPI";
import { useUpdateCartNumbers } from "../../context/CartItemNumbersContext";
import { deleteItemFromCart } from "../../utils/cartAPI";
import { useLoader } from "../../context/LoaderContext";

const PricingSection = () => {
  const {
    totalItems,
    totalPrice,
    checkoutAddress,
    paymentValid,
    products,
    updatePaymentValid,
    updateCheckoutAddress,
    updateProducts,
    updateTotalItems,
    updateTotalPrice,
  } = useCheckout();
  const updateCart = useUpdateCartNumbers()

  const {updateLoaderStatus} = useLoader()


  const navigate = useNavigate();

  const location = useLocation();
  const currentRoute = location.pathname.split("/");
  const currentPage = currentRoute[currentRoute.length - 1];

  const handleCheckout = (e) => {
    e.preventDefault();
    if (currentPage === "cart") {
      navigate("/checkout/shipping");
    } else if (currentPage === "shipping") {
      if (Object.keys(checkoutAddress).length) {
        console.log(checkoutAddress);
        navigate("/checkout/payment");
      } else {
        toast.error("Please verify your address again!");
      }
    } else if (currentPage === "payment") {
      if (paymentValid) {
        // alert("order Placed");
        createOrder();
      } else {
        toast.error("Please verify your payment details again!");
      }
    }
  };

  const createOrder = async () => {
    try {
      updateLoaderStatus(true)
      for (const { product, quantity } of products) {
        const res = await newOrder(product._id, quantity, checkoutAddress);
        console.log(res);
        deleteItemFromCart(product._id)
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Order Placed Succesfully!")
      updatePaymentValid(false)
      updateCheckoutAddress({})
      updateProducts([])
      updateTotalItems(0)
      updateTotalPrice(0)
      updateCart(0)
      updateLoaderStatus(false)
      navigate('/')


    }
  };

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
        <button onClick={handleCheckout}>checkout securely</button>
      </section>
    </div>
  );
};

export default PricingSection;