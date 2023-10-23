import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../utils/getProductsAPI";
import "../../styles/productcomponent.css";
import { CircularProgress, Divider, LinearProgress, Rating } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BestSeller from "../home/BestSeller";
import { useAuth, useUpdateLoginModalStatus } from "../../context/AuthContext";
import { addItemToCart } from "../../utils/cartAPI";
import { useUpdateCartNumbers } from "../../context/CartItemNumbersContext";
import { toast } from "react-toastify";
import { useLoader } from "../../context/LoaderContext";
import { useCheckout } from "../../context/CheckoutContext";


const ProductComponent = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  const loginStatus = useAuth();
  const updateCartNumbers = useUpdateCartNumbers();
  const setShowLoginModal = useUpdateLoginModalStatus();
  const {updateLoaderStatus} = useLoader()
  const [loading, setLoading] = useState(false)

  const { updateProducts, updateTotalItems, updateTotalPrice } =
    useCheckout();
    const navigate = useNavigate()



  const [selectedQty, setSelectedQty] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true)
      const res = await getProductById(id);
      
      setProduct(res);
      scrollToTop();
    } catch (error) {}finally{
      updateLoaderStatus(false)
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    document.querySelectorAll(".product-details-box").forEach((box) => {
      box.querySelector("h5").addEventListener("click", () => {
        const content = box.querySelector("ul");
        console.log(content);
        content.classList.toggle("collapseContent");
      });
    });
  }, []);

  const handleQtyChange = (event) => {
    const newQuantity = event.target.value;
    setSelectedQty(newQuantity);
  };

  const handleAddToCart = async () => {
    if (loginStatus) {
      try {
        setLoading(true)
        const res = await addItemToCart(id, selectedQty);
        // console.log(res);
        if (res.status==='success') {
          toast.success(res.message)
          updateCartNumbers(res.results)
        } else if(res.status==='fail'){
          toast.error(res.message)
        }else{
          toast.error('Something went wrong, please try again later.')
        }
     


      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    } else {
      setShowLoginModal(true)
    }
  };

  const handleBuyNow = ()=>{

    if (loginStatus) {
       const chkoutproduct = [product]
      updateProducts(chkoutproduct)
      updateTotalItems(1)
      updateTotalPrice(product.price*selectedQty)
      navigate('/checkout/shipping')
    }else{
      setShowLoginModal(true)
    }

   
      
  }

  const handleZipSearch = (e) => {
    e.preventDefault();
  };


  const productDetailsHtml = { __html: product.description };
  return (
    <div className="product-component">
      <div className="main-product-container">
        <div className="left-side">
          {" "}
          <img style={{ width: "100%" }} src={product.displayImage} alt="" />
        </div>
        <div className="right-side">
          <section className="about-product">
            <h4 className="product-heading">{product.name}</h4>
            <span className="product-subcategory">{product.subCategory}</span>
            <p className="product-price">&#8377; {product.price}</p>
            <p style={{ color: "#878484", fontWeight: "600" }}>
              Inclusive of All Taxes + Free Shipping
            </p>
            <div className="product-rating">
              <Rating name="read-only" value={product.ratings || 0} readOnly />
              <p>{product.ratings}</p>
            </div>
            <div className="product-discount">
              <DiscountIcon />
              <span>Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</span>
            </div>
            <div className="qty-section">
              <label htmlFor="quantity">QTY:</label>
              <select
                name="quantity"
                id="quantity"
                value={selectedQty}
                onChange={handleQtyChange}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-buttons">
              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: "#51CCCC", color: "white" }}
              >
                {loading?<CircularProgress size={20} color="inherit"/>:<><AddShoppingCartIcon />
                <span>Add to cart</span></>}
              </button>
              <button onClick={handleBuyNow} style={{ backgroundColor: "#F9EB28" }}>
                <ShoppingCartCheckoutIcon />
                <span>Buy Now</span>
              </button>
            </div>
            <div className="delivery-options">
              <h4>delivery options</h4>
              <section className="delivery-options-box">
                <p>
                  Enter your Pincode to check the delivery time and free pick up
                  options
                </p>
                <form onSubmit={handleZipSearch}>
                  {" "}
                  <input type="text" name="zipcode" id="zipcode" />{" "}
                  <button type="submit">check</button>
                </form>
                <label>
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/cod.jpg"
                    alt="cod"
                  />
                  Cash On Delivery
                </label>
                <label>
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/ship.jpg"
                    alt="cod"
                  />
                  Express Shipping
                </label>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div className="product-info-container">
        <h3>Product Details</h3>
        <div className="product-details-section">
          <div className="product-details-box">
            <h5>Product Description</h5>
              {/* <ul>
                <li>It is a long established fact that a reader will</li>
                <li>Be distracted by the readable content</li>
                <li>Of a page when looking at its layout</li>
                <li>The point of using Lorem Ipsum is that it</li>
                <li>Has a more-or-less normal distribution of letters</li>
                <li>As opposed to using 'Content here, content here', making it look like readable English.</li>
              </ul> */}
              <ul><li><div dangerouslySetInnerHTML={productDetailsHtml} /></li></ul>
              
              
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <ul>
                <li>It is a long established fact that a reader will</li>
                <li>Be distracted by the readable content</li>
                <li>Of a page when looking at its layout</li>
                <li>The point of using Lorem Ipsum is that it</li>
                <li>Has a more-or-less normal distribution of letters</li>
                <li>As opposed to using 'Content here, content here', making it look like readable English.</li>
              </ul>
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <ul>
                <li>It is a long established fact that a reader will</li>
                <li>Be distracted by the readable content</li>
                <li>Of a page when looking at its layout</li>
                <li>The point of using Lorem Ipsum is that it</li>
                <li>Has a more-or-less normal distribution of letters</li>
                <li>As opposed to using 'Content here, content here', making it look like readable English.</li>
              </ul>
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
           
            <ul>
                <li>It is a long established fact that a reader will</li>
                <li>Be distracted by the readable content</li>
                <li>Of a page when looking at its layout</li>
                <li>The point of using Lorem Ipsum is that it</li>
                <li>Has a more-or-less normal distribution of letters</li>
                <li>As opposed to using 'Content here, content here', making it look like readable English.</li>
              </ul>
            
          </div>
        </div>
      </div>
      <div className="ratings-review-container">
        <h3>Rating & Reviews</h3>
        <div className="ratings-review-section">
          <div className="review-section-left">
            <h3>4.8</h3>
            <Rating name="read-only" value={5} readOnly />
            <p>Based on 31K+ ratings and 9K+ reviews</p>
          </div>
          <div className="review-section-right">
            <h4>Product reviews</h4>
            <p>
              <ThumbUpIcon />
              91% of customers recommend this brand
            </p>
            <Divider sx={{ marginBottom: "2rem" }} />
            <div className="rating-bar">
              <span>5</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={80}
              />
              <span>80+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>4</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={10}
              />
              <span>10+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>3</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={7}
              />{" "}
              <span>7+</span>
            </div>
            <div className="rating-bar">
              <span>2</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={3}
              />{" "}
              <span>3+</span>
            </div>
            <div className="rating-bar">
              <span>1</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={1}
              />{" "}
              <span>1+</span>
            </div>
          </div>
        </div>
      </div>
      <BestSeller />
      <div className="about-us-container">
        <ul>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon1.jpg"
              alt="1.5M+ Happy Beyoungsters"
            />
            <p>1.5M+ Happy Beyoungsters</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon2.jpg"
              alt="15 Days Easy Returns"
            />
            <p>15 Days Easy Returns</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon3.jpg"
              alt="Homegrown Brand"
            />
            <p>Homegrown Brand</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon4.jpg"
              alt="Packed with Safety"
            />
            <p>Packed with Safety</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;
