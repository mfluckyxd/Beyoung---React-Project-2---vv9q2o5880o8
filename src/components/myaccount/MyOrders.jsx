import React, { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { getOrderHistory } from "../../utils/orderAPI";
import MyOrderCard from "./MyOrderCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { updateLoaderStatus } = useLoader();

  const fetchOrders = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getOrderHistory()
      
      if (res.status==='success') {
        setOrders(res.data)
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };
  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className="my-orders-container">
      
      {orders.map((order,i)=>(
        <MyOrderCard key={i} orderItem={order}/>
      ))}
    </div>
  );
};

export default MyOrders;
