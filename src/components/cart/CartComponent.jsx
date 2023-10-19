import React, { useEffect, useState } from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import CartItems from "./CartItems";
import PricingSection from "../checkout/PricingSection";
import "../../styles/cart.css";
import { getCartItems } from "../../utils/cartAPI";
import EmptyCart from "./EmptyCart";

const CartComponent = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkoutData = {
    products:products,
    totalItems:totalItems,
    totalPrice:totalPrice,
  }



  const fetchProducts = async () => {
    try {
      const res = await getCartItems();
      console.log(res.data);
      const { items, totalPrice } = res.data;
      setProducts(items);
      setTotalPrice(totalPrice);
      setTotalItems(items.length);
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
            <CartItems
              products={products}
              setProducts={setProducts}
              setTotalItems={setTotalItems}
              setTotalPrice={setTotalPrice}
            />
            <PricingSection checkoutData={checkoutData} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
