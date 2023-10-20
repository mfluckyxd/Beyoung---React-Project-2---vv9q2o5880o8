import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToFavAPI } from "../../../utils/wishListAPI";
import {
  useAuth,
  useUpdateLoginModalStatus,
} from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useUpdateWishlistNumbers } from "../../../context/CartItemNumbersContext";
import { useLoader } from "../../../context/LoaderContext";

const ProductSliderCard = ({ product }) => {
  const { name, price, _id, displayImage, subCategory } = product;

  const loginStatus = useAuth();
  const setShowLoginModal = useUpdateLoginModalStatus();
  const updateWishlistNumbers = useUpdateWishlistNumbers();
  const {updateLoaderStatus} = useLoader()


  const handleAddToFav = async (e) => {
    e.preventDefault();
    const body = {
      productId: _id,
    };

    if (loginStatus) {
      try {
        updateLoaderStatus(true)
        const res = await addToFavAPI(body);
        console.log(res);
        if (res.status==='success') {
          toast.success(res.message)
          updateWishlistNumbers(res.results)
        } else if(res.status==='fail'){
          toast.error(res.message)
        }else{
          toast.error('Something went wrong, please try again later.')
        }
      } catch (error) {
        console.log(error);
      }finally{
        updateLoaderStatus(false)
      }
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <Link to={`/products/${_id}`} className="product-card" id={_id}>
      <img src={displayImage} style={{ width: "100%" }} alt={name} />
      <h5>{name}</h5>
      <p>{subCategory}</p>
      <span>&#8377;{price}</span>
      <button onClick={handleAddToFav} className="add-to-fav">
        <FavoriteBorderIcon />
      </button>
    </Link>
  );
};

export default ProductSliderCard;
