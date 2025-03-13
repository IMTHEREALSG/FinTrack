import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute =({children})=>{
    const {currentUser} = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;