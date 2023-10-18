import { Navigate, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import ProductsList from "./components/products/ProductsList";
import ProductComponent from "./components/products/ProductComponent";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />

          <Route path="/products/:id" element={<ProductComponent />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Footer />
        <ToastContainer/>
      </AuthProvider>
    </>
  );
}

export default App;
