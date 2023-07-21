import { BrowserRouter, Routes, Route , useNavigate} from "react-router-dom";
import SignupNew from "./components/SignupNew";
import "./App.css";
import Home from "./components/Home";
import CheckOutFail from "./components/CheckOutFail";
import CheckOutSuccess from "./components/CheckOutSuccess";
import Login from "./components/Login";
import Navbar1 from "./components/Navbar1";
import Products from "./components/Products";
import User from "./components/User";
import { ProductProvider, productContext } from "./components/Context";
import CartItems from "./components/CartItems";
import SetNewPassword from "./components/SetNewPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import Error from "./components/Error";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "styled-components";
import { Footer } from "./components/Footer";
// import { useContext } from "react";

export const App = () : JSX.Element => {
  // const navigate = useNavigate();
  // const {cartCount , updateCartCount } = useContext(productContext);
  const theme = {
    colors: { bg: "#000" },
    media: {
      mobile: '768px',
      tab: '998px'
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ProductProvider>
          <BrowserRouter>
            <Navbar1 />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoutes />} />
              <Route path="/product" element={<Products />} />
              <Route path="/user" element={<User />} />
              <Route path="/cartItems" element={<CartItems />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setNewPassword" element={<SetNewPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupNew />} />
              <Route path="/checkout-success" element={<CheckOutSuccess />} />
              <Route path="/checkout-fail" element={<CheckOutFail />} />
              <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ProductProvider>
      </div>
    </ThemeProvider>
  );
}

