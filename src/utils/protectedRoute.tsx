import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  if (!localStorage.getItem('accessToken')) {
    return <Navigate to={redirectPath} replace />
  };
return <Outlet />;
};

// export default ProtectedRoute;