import React, { useEffect, useState } from "react";
import { getWishlistItems } from "../../utils/wishListAPI";
import { useLoader } from "../../context/LoaderContext";
import WishlistCard from "./WishlistCard";
import emptyImage from "../../assets/EMPTY-WISHLIST-PAGE.jpg";

const WishList = () => {
  const [products, setProducts] = useState([]);

  const { updateLoaderStatus } = useLoader();

  const removeProductFromState = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
  };

  const fetchproducts = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getWishlistItems();
      if (res.status === "success") {
        setProducts(res.data.items);
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    fetchproducts();
    scrollToTop()
  }, []);
  return (
    <div className="wishlist-section" >
      {products.length === 0 ? (
        <img style={{width:'70%',margin:'0 auto'}} src={emptyImage} alt="empty-wishlist" />
      ) : (
        <div className="wishlist-container">
          {products.map((product, i) => (
            <WishlistCard
              key={i}
              product={product}
              removeProductFromState={removeProductFromState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
