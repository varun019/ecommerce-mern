import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, NavLink } from "react-router-dom";
import { productContext, ProductContextType } from "./Context";

const Navbar1 = () => {
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useContext(productContext) as ProductContextType;

  const user = localStorage.getItem('user');

  const logout = (): void => {
    localStorage.clear();
    updateCartCount(0); // Clear the cart count
    navigate('/login');
  }

  useEffect(() => {
    updateCartCount(cartCount);
  }, [cartCount])

  return (
    <div>
      <Navbar bg="light" variant="dark" className="fixed-top p-0">
        <Container>
          <NavLink to="/" className="navbar-brand text-primary title fw-normal">TechnoKart</NavLink>
          <Navbar.Toggle />
          {!user ? (
            <>
              <div>
                <button className="btn text-primary border-0 fs-5" onClick={() => { navigate('/login') }}>Login</button>
                <button className="btn text-primary mx-5 border-0 fs-5" onClick={() => { navigate('/product') }}>Products</button>
              </div>
            </>
          ) : (
            <>
              <button className="btn text-primary mx-5 border-0 fs-5" onClick={() => { navigate('/product') }}>Products</button>
              <button className="btn text-primary mx-5" defaultValue='0' onClick={() => { navigate('/cartItems') }}> Your Cart Items: ({cartCount ? cartCount : 0})</button>
              <Navbar.Collapse className="justify-content-end mx-5">
                <Navbar.Text className="text-primary">
                  Username: {JSON.parse(user).username}
                </Navbar.Text>
              </Navbar.Collapse>
              <button className="btn text-primary border-0 fs-5" onClick={logout}>Logout</button>
              <button className="btn text-primary mx-3 border-0 fs-5" onClick={() => navigate('/profile')}>Profile</button>

            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar1;
