import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductById } from "../../utils/getProductsAPI";
import "../../styles/productcomponent.css";
import { Rating } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const ProductComponent = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const [product, setProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProductById(id);
      console.log(res);
      setProduct(res);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="product-component">
      <div className="main-product-container">
        <div className="left-side">
          {" "}
          <img style={{ width: "100%" }} src={product.displayImage} alt="" />
        </div>
        <div className="right-side">
          <section className="about-product">
            <h4 className="product-heading">{product.name}</h4>
            <span className="product-subcategory">{product.subCategory}</span>
            <p className="product-price">&#8377; {product.price}</p>
            <p style={{ color: "#878484", fontWeight: "600" }}>
              Inclusive of All Taxes + Free Shipping
            </p>
            <div className="product-rating">
              <Rating name="read-only" value={product.ratings} readOnly />
              <p>{product.ratings}</p>
            </div>
            <div className="product-discount">
              <DiscountIcon />{" "}
              <span>Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</span>
            </div>
            <div className="qty-section">
              <label for="quantity">QTY:</label>
              <select name="quantity" id="quantity">
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              
              </select>
            </div>
            <div className="product-buttons">
                <button style={{backgroundColor:'#51CCCC', color:'white'}}><AddShoppingCartIcon/><span>Add to cart</span></button>
                <button style={{backgroundColor:'#F9EB28'}}><ShoppingCartCheckoutIcon/><span>Buy Now</span></button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
