import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {


  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateProducts = (newData) => {
    setProducts(newData);
  };
  const updateTotalItems = (newData) => {
    setTotalItems(newData);
  };
  const updateTotalPrice = (newData) => {
    setTotalPrice(newData);
  };


  return (
    <CheckoutContext.Provider value={{ products,totalItems,totalPrice, updateProducts,updateTotalItems,updateTotalPrice}}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);

    return {
      products: context.products,
      totalItems: context.totalItems,
      totalPrice: context.totalPrice,
      updateProducts: context.updateProducts,
      updateTotalItems: context.updateTotalItems,
      updateTotalPrice: context.updateTotalPrice,
    };
  }





