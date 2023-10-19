import React from "react";
import ProductSliderCard from "../home/product_card/ProductSliderCard";
import "../../styles/productlist.css";
import { useSearchParams } from "react-router-dom";

const ProductsListComponent = ({ products, setSearchParams }) => {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  let heading = 'shop all'
  for (const value of params.values()) {
    if (value) {
      heading = value
    }
  }

  const handleFilter = () => {
    setSearchParams({ color: "black" });
  };
  return (
    <div className="products-list-compo-container">
      <section className="product-list-filter-section">
        <button onClick={handleFilter}>filter</button>
      </section>
      <section className="product-list-section">
        <h3>{heading}</h3>
        <div className="product-list-cards-container">
          {products.length &&
            products.map((product, i) => (
              <ProductSliderCard key={i} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsListComponent;
