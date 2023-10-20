import React, { useEffect, useState } from "react";

import { getAllProductsByLimit, getProductsBySearch } from "../../utils/getProductsAPI";

import ProductSlider from "./product_card/ProductSlider";
import { useLoader } from "../../context/LoaderContext";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo]=useState(1)
  const {updateLoaderStatus} = useLoader()

  

  const fetchProducts = async () => {


    const filter = {
      sellerTag: 'new arrival'
    }
    try {
      updateLoaderStatus(true)
        const res = await getProductsBySearch(pageNo,filter);
        setProducts(res);
    } catch (error) {}finally{
      updateLoaderStatus(false)
    }
  };

  useEffect(() => {
    fetchProducts();
    
  }, []);


  return (
    <div className="new-arrivals-container">
      
        
        <ProductSlider products={products} heading={'new arrivals'}/>
      
    </div>
  );
};

export default NewArrivals;
