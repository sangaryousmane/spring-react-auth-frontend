import {createContext, useContext, useState} from "react";
import {App_Constants} from "../utils/constants";


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = App_Constants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const contextValue = {
        backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData
    }

    return (
        <AppContext.Provider value={contextValue}>
              {props.children}
        </AppContext.Provider>
    )
}