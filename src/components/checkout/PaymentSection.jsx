import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";

const PaymentSection = () => {

  const [disableForm, setDisableForm] = useState(false);
  const [errors, setErrors] = useState({
    ccnum:false,
    name:false,
    month:false,
    year:false,
    cvv:false
  })
  const [ccnum, setCcnum] = useState('')
  const handleChanges = (e)=>{
    const { name, value } = e.target;

    if (name === "ccnum"&&value.length <= 16) {
      setCcnum(value);
      setErrors({ ...errors, [name]: value.length<16?true:false });
      
    } else if (name === "month" && (value.length !==2|| parseInt(value, 10) > 12)||parseInt(value, 10) ===0) {
      setErrors({ ...errors, [name]: true });
    }else if(name==='year' && (value.length!==4||parseInt(value, 10) ===0)){
      setErrors({ ...errors, [name]: true });
    }else if(name==='name' && value.length<3){
      setErrors({ ...errors, [name]: true });
    }else if(name==='cvv' && value.length!==3){
      setErrors({ ...errors, [name]: true });
    }else{
      setErrors({ ...errors, [name]: false });
    }
  }

  const {updatePaymentValid} = useCheckout();
  const handleFormSubmit = (e)=>{
    e.preventDefault();
    if (!disableForm) {
      if (!Object.values(errors).some((error) => error)) {
        updatePaymentValid(true)
        setDisableForm(true);
      }
    } else {
      updatePaymentValid(false)
      setDisableForm(false);
    }
  }
  return (
    <div className="cart-items-container payments-container">
      <h5>Enter Your Debit/Credit Card Details</h5>
      <p>We do not store your card details.</p>
      <section className="payments form">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card number"
                type="number"
                name="ccnum"
                value={ccnum}
                onChange={handleChanges}
                variant="outlined"
                inputProps={{ maxLength: 16 }}
                required
                fullWidth
                disabled={disableForm}
                error={errors.ccnum}
                helperText={
                  errors.ccnum ? "Card Number must be 16 digits only" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                name="name"
                onChange={handleChanges}
                variant="outlined"
                required
                fullWidth
                disabled={disableForm}
                error={errors.name}
                helperText={
                  errors.name ? "Name must be at least 3 characters long" : ""
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="MM"
                type="number"
                name="month"
                
                onChange={handleChanges}
                variant="outlined"
                required
                fullWidth
                disabled={disableForm}
                error={errors.month}
                helperText={
                  errors.month ? "Please enter a valid month value" : ""
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="YYYY"
                type="number"
                name="year"
                
                onChange={handleChanges}
                variant="outlined"
                required
                fullWidth
                disabled={disableForm}
                error={errors.year}
                helperText={
                  errors.year ? "Please enter a valid month value" : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                type="number"
                name="cvv"
                
                onChange={handleChanges}
                variant="outlined"
                required
                fullWidth
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                disabled={disableForm}
                error={errors.cvv}
                helperText={
                  errors.cvv ? "CVV must be 3 digits only" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", marginTop: "1rem" }}
                value={disableForm}
              >
                {disableForm ? "Edit details" : "Confirm"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default PaymentSection;
