import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // si no esta autenticado, redirigimos a login
    return <Navigate to="/login" />;
  }

    // Si está autenticado, renderiza el componente hijo (ej: Profile)
    // Outlet es un placeholder para el componente de la ruta anidada
  return <Outlet />;
}

export default ProtectedRoute;