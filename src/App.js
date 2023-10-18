import { Navigate, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import ProductsList from "./components/products/ProductsList";
import ProductComponent from "./components/products/ProductComponent";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartNumbersProvider } from "./context/CartItemNumbersContext";
import { CartComponent } from "./components/cart/CartComponent";

function App() {
  return (
    <>
      <AuthProvider>
        <CartNumbersProvider>
          <Routes>
          <Route path="/cart" element={<CartComponent />} />
          </Routes>
          <Header />
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductComponent />} />
            {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
          </Routes>
          <Footer />
          <ToastContainer />
        </CartNumbersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
