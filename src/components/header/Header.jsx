import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logoSVG from "../../Logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../authentication/Login";
import { useAuth, useUpdateLoginModalStatus, useUpdateLoginStatus } from "../../context/AuthContext";
import { toast } from "react-toastify";

import { Badge, ClickAwayListener, Popper, TextField } from "@mui/material";
import {
  useCartNumbers,
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
  useWishlistNumbers,
} from "../../context/CartItemNumbersContext";
import { useLoader } from "../../context/LoaderContext";
import { getProductsBySearch } from "../../utils/getProductsAPI";

const Header = () => {
  const loginStatus = useAuth();
  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers()
  const numberOfCartItems = useCartNumbers();
  const numberOfWishlistItems = useWishlistNumbers();
  const setShowLoginModal = useUpdateLoginModalStatus();





  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    updateLoginStatus(false);
    toast.success("Logged out succesfully", { position: "bottom-left" });
    updateCartNumbers(0);
    updateWishlistNumbers(0)
  };

  useEffect(() => {
    const navbar = document.querySelector(".nav-header");
    const container = document.querySelector(".app-header");

    const promoHeader = document.querySelector(".promo-header");
    const quickAccessHeader = document.querySelector(".quick-access-header");

    const handleScroll = () => {
      if (
        window.scrollY >
        container.offsetTop +
          promoHeader.clientHeight +
          quickAccessHeader.clientHeight
      ) {
        navbar.classList.add("fixed");
      } else {
        navbar.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const searchInputRef = useRef()
  const navigate = useNavigate()

  const handleSearchBtnClick = (event) => {
    if (anchorEl) {
      setIsSearchbarOpen(false);
      setAnchorEl(null);
    } else {
      setIsSearchbarOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

const handleSearch = async ()=>{
  const {value} = searchInputRef.current;
  // console.log(value);
  setIsSearchbarOpen(false);
  navigate(`/products?name=${value}`)
  

}
   
  const handleSignin = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };
  return (
    <div className="app-header">
      <section className="promo-header">
        <span>Free Shipping on All Orders |</span> Get Extra ₹100 OFF on minimum
        purchase of ₹999{" "}
      </section>
      <section className="quick-access-header">
        <div className="quick-access-left">
          <Link>
            <LocationOnIcon />
            Track Order
          </Link>
        </div>
        <div className="quick-access-right">
          {loginStatus ? (
            <>
              <button>My Account</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleSignin}>Sign In</button>
              <button onClick={handleSignin}>Sign Up</button>
            </>
          )}
        </div>
      </section>
      <section className="nav-header">
        <div className="nav-left">
          <button
            className="d-lg-none d-md-none nav-toggel-button"
            type="button"
            data-toggle="collapse"
            data-target="#collapsNavbar"
          >
            <MenuIcon sx={{ height: "35px", width: "35px" }} />
          </button>
          <div className="nav-left-items">
            <Link to={"/"} className="nav-logo">
              <img src={logoSVG} alt="Logo" />
            </Link>
            <div
              className="collapse navbar-collapse d-lg-block d-md-block"
              id="collapsNavbar"
            >
              <nav className="nav-items ">
                <NavLink to={"/products?gender=men"}>Men</NavLink>
                <NavLink to={"/products?gender=women"}>Women</NavLink>
                <NavLink to={"/products?sellerTag=new arrival"}>
                  New arrivals
                </NavLink>
                <NavLink to={"/products?q=shop all"}>Shop All</NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleSearchBtnClick}>
            <SearchIcon />
          </button>
          <Link>
          <Badge badgeContent={numberOfWishlistItems} color="primary">
            <FavoriteIcon />
            </Badge>
          </Link>
          <Link to={'/cart'}>
            <Badge badgeContent={numberOfCartItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </section>
      
      {isSearchbarOpen && (
        <ClickAwayListener onClickAway={handleSearchBtnClick}>
          <Popper open={isSearchbarOpen} anchorEl={anchorEl} placement="bottom-end" >
            <div className="search-bar">
              <input id="searchBarInput" type="text" placeholder="Search entire store here..." ref={searchInputRef}/>
              <button onClick={handleSearch}>Search</button>
            </div>
          </Popper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Header;
