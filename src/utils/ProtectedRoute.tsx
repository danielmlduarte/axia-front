import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  const token = Cookies.get("token");
  console.log(token)
  return !!Cookies.get("token");
};

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}