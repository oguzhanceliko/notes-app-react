import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated',isAuthenticated)
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />
}
