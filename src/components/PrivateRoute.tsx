import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute() {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
}
