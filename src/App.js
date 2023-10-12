import { Navigate, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import ProductsByGender from "./components/routers/ProductsByGender";
import ProductComponent from "./components/products/ProductComponent";



function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/men" element={<ProductsByGender/>}/>
        <Route path="/women" element={<ProductsByGender/>}/>
        <Route path="/product" element={<ProductComponent/>}/>
        <Route path="*" element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
