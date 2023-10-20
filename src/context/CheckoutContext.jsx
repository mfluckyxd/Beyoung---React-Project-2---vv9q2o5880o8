import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {


  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products'))||[]);
  const [totalItems, setTotalItems] = useState(parseInt(localStorage.getItem("totalItems")) || 0);
  const [totalPrice, setTotalPrice] = useState(parseInt(localStorage.getItem("totalPrice")) ||0);
  const [checkoutAddress, setCheckoutAddress]= useState(JSON.parse(localStorage.getItem('checkoutAddress'))||{})
  const [paymentValid, setPaymentValid] = useState(false);

  const updateProducts = (newData) => {
    setProducts(newData);
    localStorage.setItem('products', JSON.stringify(newData));

  };
  const updateCheckoutAddress = (newData) => {
    setCheckoutAddress(newData);
    localStorage.setItem('checkoutAddress', JSON.stringify(newData));

  };
  const updatePaymentValid = (newData)=>{
    setPaymentValid(newData)
  }


  const updateTotalItems = (newData) => {
    setTotalItems(newData);
    localStorage.setItem('totalItems', newData);

  };
  const updateTotalPrice = (newData) => {
    setTotalPrice(newData);
    localStorage.setItem('totalPrice', newData);

  };


  return (
    <CheckoutContext.Provider value={{paymentValid,updatePaymentValid, products,totalItems,totalPrice,checkoutAddress,updateCheckoutAddress, updateProducts,updateTotalItems,updateTotalPrice}}>
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
      checkoutAddress:context.checkoutAddress,
      paymentValid:context.paymentValid,
      updatePaymentValid:context.updatePaymentValid,
      updateCheckoutAddress:context.updateCheckoutAddress,
      updateProducts: context.updateProducts,
      updateTotalItems: context.updateTotalItems,
      updateTotalPrice: context.updateTotalPrice,
    };
  }





