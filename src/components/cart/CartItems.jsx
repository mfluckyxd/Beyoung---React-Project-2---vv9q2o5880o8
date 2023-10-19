import React from "react";
import CartItemCard from "./CartItemCard";

const CartItems = ({ products, setProducts,setTotalPrice,setTotalItems }) => {
  const removeProductFromState = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.product._id !== productId
    );

    setProducts(updatedProducts);
  };
  return (
    <div className="cart-items-container">
      {products.length &&
        products.map((product, i) => (
          <CartItemCard
            key={i}
            product={product}
            removeProductFromState={removeProductFromState}
            setTotalPrice={setTotalPrice}
            setTotalItems={setTotalItems}
          />
        ))}
    </div>
  );
};

export default CartItems;
