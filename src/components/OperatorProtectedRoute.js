import { Navigate } from "react-router-dom";

const OperatorProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("token");

  return authToken ? children : <Navigate to="/login/operator" />;
};

export default OperatorProtectedRoute;
