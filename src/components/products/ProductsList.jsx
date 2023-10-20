import React, { useEffect, useState } from "react";
import ProductsListComponent from "../products/ProductsListComponent";
import { getProductsBySearch } from "../../utils/getProductsAPI";
import { useSearchParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import NoProducts from "./NoProducts";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  // const [filter, setFilter] = useState({});

  const { updateLoaderStatus } = useLoader();

  const fetchProducts = async (searchFilter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(pageNo, searchFilter);
      // console.log(res);
      // setProducts(res);
      if (res.status==='success') {
        setProducts(res.data)
      }else{
        setProducts(false)
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    let filter = {};
    searchParams.forEach((value, key) => {
      filter[key] = decodeURIComponent(value);
    });
    // setFilter(filter);
    fetchProducts(filter)
  }, [searchParams]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [filter, pageNo]);
 
  return (
    <div>
      {!products ? (
        <NoProducts/>
      ) : (
        <ProductsListComponent
          products={products}
        />
      )}
    </div>
  );
};

export default ProductsList;
