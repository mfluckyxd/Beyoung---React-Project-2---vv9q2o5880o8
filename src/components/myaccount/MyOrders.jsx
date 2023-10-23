import React, { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { getOrderHistory } from "../../utils/orderAPI";
import MyOrderCard from "./MyOrderCard";
import emptyImage from "../../assets/no-orders.gif";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { updateLoaderStatus } = useLoader();

  const fetchOrders = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getOrderHistory();

      if (res.status === "success") {
        setOrders(res.data);
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className="my-orders-section"
      
    >
      {orders.length === 0 ? (
        <img style={{width:'70%',margin:'0 auto'}} src={emptyImage} alt="no-orders" />
      ) : (
        <div className="my-orders-container">
          {orders.map((order, i) => (
            <MyOrderCard key={i} orderItem={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;