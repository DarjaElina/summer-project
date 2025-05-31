import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
