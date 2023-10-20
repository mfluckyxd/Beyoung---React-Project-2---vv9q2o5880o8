import { Navigate, Route, Routes } from "react-router";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartNumbersProvider } from "./context/CartItemNumbersContext";
import RoutesComponent from "./components/RoutesComponent";
import CheckoutComponent from "./components/checkout/CheckoutComponent";
import CartItems from "./components/cart/CartItems";
import ShippingSection from "./components/checkout/ShippingSection";
import PaymentSection from "./components/checkout/PaymentSection";
import CartComponent from "./components/cart/CartComponent";
import { CheckoutProvider } from "./context/CheckoutContext";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <AuthProvider>
        <CartNumbersProvider>
          <CheckoutProvider>
            <LoaderProvider>
          <Routes>
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/checkout" element={<CheckoutComponent />}>
              <Route index element={<Navigate to="shipping" />} />
              
              <Route path="shipping" element={<ShippingSection />} />
              <Route path="payment" element={<PaymentSection />} />
            </Route>
            <Route path="*" element={<RoutesComponent />} />
          </Routes>

          <ToastContainer autoClose={3000} position="bottom-left"/>
          <Loader/>
          </LoaderProvider>
          </CheckoutProvider>
        </CartNumbersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
