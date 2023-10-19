import React from "react";
import Header from "./header/Header";
import { Navigate, Route, Routes } from "react-router";
import Home from "./home/Home";
import ProductsList from "./products/ProductsList";
import ProductComponent from "./products/ProductComponent";
import Footer from "./footer/Footer";
import Login from "./authentication/Login";


const RoutesComponent = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductComponent />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Login  />

      <Footer />
    </>
  );
};

export default RoutesComponent;
