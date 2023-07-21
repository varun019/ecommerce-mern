import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = (): JSX.Element => {
  const userData = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null && window.location.pathname !== 'login') {
      navigate('/login');
    }
  }, []);

  let auth = { token: userData };

  return auth.token ? <Outlet /> : <Navigate to="/product" />;
};

export default PrivateRoutes;
