import React, { useEffect, useState } from "react";
import ProductsListComponent from "../products/ProductsListComponent";
import { getProductsBySearch } from "../../utils/getProductsAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import NoProducts from "./NoProducts";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevSearchParams, setPrevSearchParams] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { updateLoaderStatus } = useLoader();

  const fetchProducts = async (searchFilter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(searchFilter);

      if (res.status === "success") {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 800
    ) {
      setScrollPosition(window.scrollY);
      setPageNo((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    let filter = {};
    if (searchParams.size === 0) {
      navigate("/");
    }
    searchParams.forEach((value, key) => {
      if (value !== "shop all") {
        filter[key] = decodeURIComponent(value);
      }
    });

    const isSearchChange = prevSearchParams !== searchParams.toString();
    if (isSearchChange) {
      setScrollPosition(0);
      setPageNo(1);
      scrollToTop();
    }

    setPrevSearchParams(searchParams.toString());

    fetchProducts(filter);
    
  }, [searchParams]);

  

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [pageNo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  
  const isEmpty = !Object.keys(products).length;

  return (
    <div>
      {isEmpty ? (
        <NoProducts />
      ) : (
        <ProductsListComponent products={products} pageNo={pageNo} />
      )}
    </div>
  );
};

export default ProductsList;
