import React, { createContext, useContext, useState } from "react";

const cartNumberContext = createContext();

export function CartNumbersProvider({ children }) {
  const [cartNumbers, setCartNumbers] = useState(localStorage.getItem("cartItemNums") || 0);

  const updateCartNumbers = (newNum) => {
    setCartNumbers(newNum);
    localStorage.setItem('cartItemNums', newNum);
  };

  return (
    <cartNumberContext.Provider value={{ cartNumbers, updateCartNumbers }}>
      {children}
    </cartNumberContext.Provider>
  );
}

export function useCartNumbers() {
  const context = useContext(cartNumberContext);
  return context.cartNumbers;
}

export function useUpdateCartNumbers() {
  const context = useContext(cartNumberContext);
  return context.updateCartNumbers; // Return the function itself, not a property of the function
}
