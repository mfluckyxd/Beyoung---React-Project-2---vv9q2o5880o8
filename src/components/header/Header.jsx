import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logoSVG from "../../Logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../authentication/Login";

const Header = () => {

  useEffect(() => {
    const navbar = document.querySelector('.nav-header');
    const container = document.querySelector('.app-header');

    const promoHeader = document.querySelector('.promo-header')
    const quickAccessHeader = document.querySelector('.quick-access-header')

    

    const handleScroll = () => {
      if (window.scrollY > container.offsetTop+promoHeader.clientHeight+quickAccessHeader.clientHeight) {
        navbar.classList.add('fixed');
      } else {
        navbar.classList.remove('fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showLoginModal, setShowLoginModal] = useState()
  const handleSignin =(e)=>{
    e.preventDefault();
    setShowLoginModal(true)

  }
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
          <Link onClick={handleSignin}>Sign In</Link>
          <Link>Sign Up</Link>
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
            <MenuIcon sx={{height:"35px", width:'35px'}} />
          </button>
          <div className="nav-left-items">
            <Link to={'/'} className="nav-logo">
              <img src={logoSVG} alt="Logo" />
            </Link>
            <div className="collapse navbar-collapse d-lg-block d-md-block" id="collapsNavbar">
              <nav className="nav-items ">
                <NavLink to={'/products?gender=men'}>Men</NavLink>
                <NavLink to={'/products?gender=women'}>Women</NavLink>
                <NavLink to={'/products?sellerTag=new-arrival'}>New arrivals</NavLink>
                <NavLink to={'/products'}>Shop All</NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <Link>
            <SearchIcon />
          </Link>
          <Link>
            <FavoriteIcon />
          </Link>
          <Link>
            <ShoppingCartIcon />
          </Link>
        </div>
      </section>
      <Login open={showLoginModal} setOpen={setShowLoginModal}/>
    </div>
  );
};

export default Header;
