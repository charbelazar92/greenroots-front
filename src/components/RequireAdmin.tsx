import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return null; 

  if (user?.role !== "admin") return <Navigate to="/" replace />;

  return children;
}