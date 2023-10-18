import React, { useEffect, useState } from "react";
import ProductsListComponent from "../products/ProductsListComponent";
import { getProductsBySearch } from "../../utils/getProductsAPI";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await getProductsBySearch(pageNo, filter);
      setProducts(res);
    } catch (error) {}
  };

  useEffect(() => {
    let filter = {};
    searchParams.forEach((value, key) => {
      filter[key] = value.replace(/-/g, " ");
    });
    setFilter(filter);
  }, [searchParams]);
  
  useEffect(() => {
    fetchProducts();
  }, [filter, pageNo]);
  return (
    <div>
      <ProductsListComponent
        products={products}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default ProductsList;
