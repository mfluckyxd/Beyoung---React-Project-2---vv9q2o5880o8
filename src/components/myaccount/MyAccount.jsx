import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import "../../styles/myaccount.css";
import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateLoginStatus } from "../../context/AuthContext";
import { useUpdateCartNumbers, useUpdateWishlistNumbers } from "../../context/CartItemNumbersContext";

const MyAccount = () => {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("useremail");

  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers()

  const navigate = useNavigate()


  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const collapsRef = useRef(null);
  const [collapsActive, setCollapsActive] = useState(false);

  const toggelCollaps = () => {
    setCollapsActive(!collapsActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    updateLoginStatus(false);
    toast.success("Logged out succesfully", { position: "bottom-left" });
    
    updateCartNumbers(0);
    updateWishlistNumbers(0)

    navigate('/')
  };


  return (
    <div className="my-account-container">
      <section className="my-ac-left-section">
        <div className="upper-sec">
          <Stack
            sx={{ margin: "1rem" }}
            alignItems="center"
            justifyContent="center"
            spacing={0.7}
          >
            <Avatar
              sx={{ height: "100px", width: "100px", background: "black" }}
            >
              {name?.split(' ')?.map((word) => word[0]?.toUpperCase()).join(' ')}
            </Avatar>
            <Typography sx={{textTransform:'uppercase'}} variant="h5">{name}</Typography>
            <Typography sx={{ color: "gray" }} variant="subtitle1">
              #Beyoungster
            </Typography>
          </Stack>
        </div>
        {isSmallScreen&&<button onClick={toggelCollaps} className="profile-btn-collaps"><KeyboardDoubleArrowDownIcon /></button>}
        <div className={`lower-sec ${collapsActive ? 'collaps-active' : ''}`} ref={collapsRef}>
            <nav>
                
                <NavLink to={'profile'}>Profile</NavLink>
                <NavLink to={'orders'}>Order</NavLink>
                <NavLink to={'wishlist'}>Wishlist</NavLink>
                
            </nav>
            <button onClick={handleLogout}>logout</button>
        </div>
      </section>

      
      <section className="my-ac-right-section">
        <Outlet />
      </section>
    </div>
  );
};

export default MyAccount;
