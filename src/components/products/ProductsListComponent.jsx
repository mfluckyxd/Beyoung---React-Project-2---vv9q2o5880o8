import React, { useEffect, useState } from "react";
import ProductSliderCard from "../home/product_card/ProductSliderCard";
import "../../styles/productlist.css";
import { useSearchParams } from "react-router-dom";
import FilterCustomDropdown from "./FilterCustomDropdown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductsListComponent = ({ products, pageNo }) => {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  const [collapsActive, setCollapsActive] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(products);

  let heading = "shop all";
  for (const value of params.values()) {
    if (value) {
      heading = value;
    }
  }

  const uniqueValues = (arr, key) => {

    return [...new Set(arr.map((item) => item[key].toLowerCase()))];
  };
  const getInitialFilter = (products) => {
    const subCategories = uniqueValues(products, "subCategory");
    const brands = uniqueValues(products, "brand");
    const colors = uniqueValues(products, "color");

    return {
      subCategory: subCategories,
      brand: brands,
      color: colors,
    };
  };

  const initialFilter = getInitialFilter(products);
  const [filterCriteria, setFilterCriteria] = useState(initialFilter);

  const [productsFilter, setProductsFilter] = useState({
    subCategory: [],
    brand: [],
    color: [],
  });

  const applyFilter = () => {
    const { subCategory, brand, color } = productsFilter;
    const filteredResult = products.filter((product) => {
      const subCategoryFilter =
        subCategory.length === 0 || subCategory.includes(product.subCategory.toLowerCase());
      const brandFilter = brand.length === 0 || brand.includes(product.brand.toLowerCase());
      const colorFilter =
        color.length === 0 || color.includes(product.color.toLowerCase());
      return subCategoryFilter && brandFilter && colorFilter;
    });

    setFilteredProducts(filteredResult);
  };

  const clearFilter = () => {
    setProductsFilter({
      subCategory: [],
      brand: [],
      color: [],
    });
    setFilteredProducts(products);
  };

  const itemsToDisplay = filteredProducts.slice(0, pageNo * 20);

  return (
    <div className="products-list-compo-container">
      <section className="product-list-section">
        <h3>{heading}</h3>
        <div className="products-container">
          <div className="product-filters">
            <section
              className="filters-heading"
              onClick={() => setCollapsActive(!collapsActive)}
            >
              <h5>Filters</h5>
              {isSmallScreen && <ExpandMoreIcon />}
            </section>

            <div
              className={`filters-container ${
                collapsActive ? "collaps-active" : ""
              }`}
            >
              <FilterCustomDropdown
                values={filterCriteria.brand}
                type={"brand"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterCustomDropdown
                values={filterCriteria.subCategory}
                type={"subCategory"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterCustomDropdown
                values={filterCriteria.color}
                type={"color"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <div className="filter-btn">
                <button id="filter-btn" onClick={applyFilter}>
                  apply
                </button>
                <button id="filter-btn" onClick={clearFilter}>
                  clear
                </button>
              </div>
            </div>
          </div>

          <div className="product-list-cards-container">
            {products.length &&
              itemsToDisplay.map((product, i) => (
                <ProductSliderCard key={i} product={product} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsListComponent;
