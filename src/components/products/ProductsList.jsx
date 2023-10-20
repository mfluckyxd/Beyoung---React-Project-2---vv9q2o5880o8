import React, { useEffect, useState } from "react";
import ProductsListComponent from "../products/ProductsListComponent";
import { getProductsBySearch } from "../../utils/getProductsAPI";
import { useSearchParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import NoProducts from "./NoProducts";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageNo, setPrevPageNo] = useState(null);
  const [prevSearchParams,setPrevSearchParams] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams();

  // const [filter, setFilter] = useState({});

  const { updateLoaderStatus } = useLoader();

  const fetchProducts = async (searchFilter,isPageChange) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(pageNo, searchFilter);
      // console.log(res);
      // setProducts(res);
      if (!isPageChange) {
        setProducts([]);
      }
      if (res.status === "success") {
        setProducts(isPageChange ? [...products, ...res.data] : res.data);
      } else {
        setProducts({});
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    let filter = {};
    
    searchParams.forEach((value, key) => {
      // console.log(value);
      if (value!=='shop all') {
        filter[key] = decodeURIComponent(value);
      }
      
    });

    const isSearchChange = prevSearchParams !== searchParams.toString();
    if (isSearchChange) {
      setPageNo(1);
      setPrevPageNo(null) // Reset pageNo to 1
    }
  
    // Set prevSearchParams to current searchParams
    setPrevSearchParams(searchParams.toString());
    // setFilter(filter);
    const isPageChange = prevPageNo !== null && prevPageNo !== pageNo;
    fetchProducts(filter,isPageChange);
  }, [searchParams, pageNo]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 800
    ) {
      setPrevPageNo(pageNo)
      setPageNo((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isEmpty = !Object.keys(products).length;

  return (
    <div>
      {isEmpty ? <NoProducts /> : <ProductsListComponent products={products} />}
    </div>
  );
};

export default ProductsList;
