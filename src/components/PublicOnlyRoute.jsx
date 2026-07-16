import {useContext} from "react";
import {AppContext} from "../context/AppContext";
import {Navigate} from "react-router-dom";


const PublicOnlyRoute = ({children}) => {
    const { isLoggedIn } = useContext(AppContext);

    if (isLoggedIn) {
        return <Navigate to="/" replace/>;
    }
    return children;
}

export default PublicOnlyRoute;