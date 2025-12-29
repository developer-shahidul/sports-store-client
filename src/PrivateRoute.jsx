//

import { useContext } from "react";
import { AuthContext } from "./Component/AuthContext/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>loading ......</div>;
  }
  if (!user) {
    return <Navigate to="/resister" replace />;
  }
  return children;
};

export default PrivateRoute;
