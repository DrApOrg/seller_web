import { Navigate, Outlet } from "react-router-dom";
import { useTokenStore } from "../store/token";

const ProtectedRoutes = () => {
  const isLogged = useTokenStore((state) => state.token);
  if (!isLogged) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
