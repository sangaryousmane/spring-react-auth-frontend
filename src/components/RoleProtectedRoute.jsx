import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RoleProtectedRoute = ({ roles, children }) => {

    const { isLoggedIn, hasAnyRole} = useContext(AppContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!hasAnyRole(roles)) {

        return <Navigate to="/403" replace />;
    }

    return children;
};

export default RoleProtectedRoute;