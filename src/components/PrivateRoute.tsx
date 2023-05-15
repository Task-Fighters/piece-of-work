import { Navigate, Outlet, useLocation } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const localUserRole = secureLocalStorage.getItem('role');
  //@ts-ignore
  return allowedRoles.includes(localUserRole) ? (
    <Outlet />
  ) : localUserRole ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
