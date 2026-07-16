import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../context/AppContext";


const ProtectedRoute = ({children}) => {
    const { isLoggedIn } = useContext(AppContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    return children;
}
export default ProtectedRoute;