import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../../styles/login.css";

import Modal from "@mui/material/Modal";
import loginBanner from "../../assets/login-banner.jpg";
import { Button, CircularProgress, TextField } from "@mui/material";
import { loginAPI, signupAPI } from "../../utils/authAPI";
import { toast } from "react-toastify";
import { useUpdateLoginStatus } from "../../context/AuthContext";
import { syncCartItems } from "../../utils/cartAPI";
import { useUpdateCartNumbers } from "../../context/CartItemNumbersContext";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width: 768px)": {
    width: "90%", // Apply width: '100%' for screens less than 750px
  },

  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
};
const Login = ({ open, setOpen }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    appType : "ecommerce"
  });
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loader, setLoader] = useState(false)

  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();



  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(false);
    }
    if (name === "password" && value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError(false);
    }
    if (name === "name" && value.length < 4) {
      setNameError("Name must be at least 4 characters long.");
    } else {
      setNameError(false);
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = () => {
    setUserInfo('')
    setOpen(false);
  }

  const handleAuth = async (e) => {
    e.preventDefault();
  
    try {
      setLoader(true)
      let res;
      if (isSignupForm) {
         res = await signupAPI(userInfo);
      } else {
        const user = {
          email: userInfo.email,
          password: userInfo.password,
          appType : "ecommerce"
        };
         res = await loginAPI(user);
      }
      // console.log(res);
      if (res.token) {
        handleClose();
        toast.success("Logged in succesfully",{position: "bottom-left"});
        updateLoginStatus(true)
        syncCartItems(updateCartNumbers)
      }else{
        toast.error(res.message,{position: "bottom-left"});
      }
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong!Please try again later.');
    }
    finally{
      setLoader(false)
    }
  };
  const authSwitch = (e) => {
    e.preventDefault();
    setIsSignupForm(!isSignupForm);

  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="login-container">
            <img
              src={loginBanner}
              alt="login-banner"
              style={{ width: "100%" }}
            />
            <div className="form-container">
              <h5>
                Login <span>or</span> Signup
              </h5>
              <p>Get Exciting Offers & Track Order</p>
              <form >
                {isSignupForm && (
                  <TextField
                    fullWidth
                    error={nameError}
                    helperText={nameError}
                    id="signup-name"
                    label="Name"
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChanges}
                    required
                  />
                )}
                <TextField
                  fullWidth
                  error={emailError}
                  helperText={emailError}
                  id="login-email"
                  label="Email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChanges}
                  required
                />
                <TextField
                  fullWidth
                  error={passwordError}
                  helperText={passwordError}
                  id="login-password"
                  label="Password"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChanges}
                  required
                />
                <Button
                  onClick={handleAuth}
                  variant="contained"
                  sx={{ "&:focus": { outline: "none" } }}
                >
                  {loader?<CircularProgress size={20} color="inherit" />:isSignupForm ? "signup" : "login"}
                  
                </Button>
                <button onClick={authSwitch} className="auth-form-switch">
                  {isSignupForm
                    ? "Alredy have an account? Sign in now"
                    : "Don't have an account? Sign up now."}
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
