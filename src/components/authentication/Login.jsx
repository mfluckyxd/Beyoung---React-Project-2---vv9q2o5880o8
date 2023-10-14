import React, {  useState } from "react";
import Box from "@mui/material/Box";
import "../../styles/login.css";

import Modal from "@mui/material/Modal";
import loginBanner from "../../assets/login-banner.jpg";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  '@media (max-width: 768px)': {
    width: '90%', // Apply width: '100%' for screens less than 750px
  }
  
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
 
};
const Login = ({ open, setOpen }) => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  
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

    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = () => setOpen(false);
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
              <form>
                {!emailError ? (
                  <TextField
                    sx={{ marginTop: "10px", width: "70%" }}
                    id="login-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChanges}
                  />
                ) : (
                  <TextField
                    error
                    helperText={emailError}
                    sx={{ marginTop: "10px", width: "70%" }}
                    id="login-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChanges}
                  />
                )}
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
