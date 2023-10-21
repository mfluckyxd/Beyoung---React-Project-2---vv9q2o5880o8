import React, { useEffect, useState } from 'react'
import { getWishlistItems } from '../../utils/wishListAPI';
import { useLoader } from '../../context/LoaderContext';
import WishlistCard from './WishlistCard';

const WishList = () => {
  const [products, setProducts] = useState([]);

  const { updateLoaderStatus } = useLoader();

  const removeProductFromState = (productId) => {
    console.log(products);
    console.log(productId);
    const updatedProducts = products.filter((product) => product._id !== productId);
    setProducts(updatedProducts);
    console.log(updatedProducts);
  };

  
  const fetchproducts = async ()=>{

    try {
      updateLoaderStatus(true)
      const res = await getWishlistItems()
      if (res.status==='success') {
        setProducts(res.data.items)
      }
    } catch (error) {
      
    }finally{
      updateLoaderStatus(false)
    }
    
  }

  useEffect(()=>{
    fetchproducts();
  },[])
  return (
    
    <div className='wishlist-container'>
      {products.map((product,i)=>(
        <WishlistCard key={i} product={product} removeProductFromState={removeProductFromState}/>
      ))}
    </div>

  )
}

export default WishList