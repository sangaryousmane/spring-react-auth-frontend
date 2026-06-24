import {createContext, useState} from "react";
import {App_Constants} from "../utils/constants";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = App_Constants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const getUserData = async () => {
        try {
            const response = await axios.get(`${backendURL}/profile`)

            if (response.status === 200) {
                setUserData(response.data);
            } else{
                toast.error("Unable to retrieve user profile.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const contextValue = {
        backendURL, isLoggedIn, setIsLoggedIn,
        userData, setUserData, getUserData
    }

    return (
        <AppContext.Provider value={contextValue}>
              {props.children}
        </AppContext.Provider>
    )
}