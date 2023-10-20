import React, { useEffect, useState } from 'react'
import ProductSlider from './product_card/ProductSlider';
import { getProductsBySearch } from '../../utils/getProductsAPI';
import { useLoader } from '../../context/LoaderContext';

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const [pageNo, setPageNo]=useState(1)
    const {updateLoaderStatus} = useLoader()


    const fetchProducts = async () => {

      const filter = {
        sellerTag: 'best seller'
      }
      try {
        updateLoaderStatus(true)
          const res = await getProductsBySearch(pageNo,filter);
          setProducts(res);
          // console.log(res);
      } catch (error) {}finally{
        updateLoaderStatus(false)
      }
    };
  
    useEffect(() => {
      fetchProducts();
      
    }, []);
  return (
    <div className='best-seller-container'>
        <ProductSlider products={products} heading={'best seller'}/>
    </div>
  )
}

export default BestSeller