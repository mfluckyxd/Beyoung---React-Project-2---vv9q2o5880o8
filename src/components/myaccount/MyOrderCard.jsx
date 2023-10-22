import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const MyOrderCard = ({ orderItem }) => {
  const { order } = orderItem;

  const { _id, totalPrice } = order;
  const { name, displayImage } = order.items[0].product;

  return (
    <div className="my-order-card">
      <Stack spacing={2}>
        <Link className="order-card-head">
          <p>Order <span>#{_id}</span></p>
          <KeyboardArrowRightIcon />
        </Link>
        <section className="order-card-detail">
          <Link>
            <img src={displayImage} alt={name}  />
          </Link>
          <div>
            <Stack sx={{ minWidth: 0,height:'100%' }} justifyContent="space-between">
              <Typography  sx={{maxWidth:'100%', fontWeight:520,color:'#070707'}}  >
                {name}
              </Typography>

              <p className="order-total-amount">
                <Typography sx={{fontWeight:590, display:'inline-block'}}>Amount: </Typography>
                &#8377;{totalPrice}
              </p>
            </Stack>
          </div>
        </section>
        <section className="order-status-btn"><button>Processing</button></section>
        
      </Stack>
    </div>
  );
};

export default MyOrderCard;
