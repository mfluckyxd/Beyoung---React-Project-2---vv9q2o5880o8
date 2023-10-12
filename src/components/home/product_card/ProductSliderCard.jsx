import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ProductSliderCard = ({ product }) => {
  const { name, price, _id, displayImage, subCategory } = product;


  const handleAddToFav =(e)=>{
    e.preventDefault();
  }
  return (
    <Link to={`/product?id=${_id}`} className="product-card" id={_id}>
      <img src={displayImage} style={{ width: "100%",  }} alt={name} />
      <h5>{name}</h5>
      <p>{subCategory}</p>
      <span>&#8377;{price}</span>
      <button onClick={handleAddToFav} className="add-to-fav"><FavoriteBorderIcon/></button>
    </Link>
  );
};

export default ProductSliderCard;
