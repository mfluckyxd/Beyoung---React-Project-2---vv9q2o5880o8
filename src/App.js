import { Navigate, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import ProductsList from "./components/routers/ProductsList";
import ProductComponent from "./components/products/ProductComponent";



function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductsList/>}/>
        
        <Route path="/products/:id" element={<ProductComponent/>}/>
        <Route path="*" element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
