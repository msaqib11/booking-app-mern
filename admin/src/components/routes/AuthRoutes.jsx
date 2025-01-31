import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const {currentUser} = useSelector((state) => state.user);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;