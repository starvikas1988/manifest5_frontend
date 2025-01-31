import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("token");

  return authToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
