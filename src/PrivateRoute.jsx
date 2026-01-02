import { useContext } from "react";

import { Navigate, useLocation } from "react-router"; // useLocation যোগ করো
import { AuthContext } from "./Component/AuthContext/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // লগইনের পর কোথায় রিডাইরেক্ট করবে তা মনে রাখার জন্য

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    // লগইনের পর ইউজারকে আগের পেজে পাঠাবে
    return <Navigate to="/resister" state={{ from: location }} replace />;
    // "/resister" না, "/signIn" বা "/login" হবে (তোমার রুট অনুযায়ী)
  }

  return children;
};

export default PrivateRoute;
