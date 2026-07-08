import {createContext, useEffect, useState} from "react";
import {App_Constants} from "../utils/constants";
import axios, {get} from "axios";
import {toast} from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;
    const backendURL = App_Constants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/profile`,
                {withCredentials: true})

            if (response.status === 200) {
                setUserData(response.data);
            } else{
                toast.error("Unable to retrieve user profile.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAuthState = async () => {

        try {
            const response = await axios.get(`${backendURL}/is-authenticated`);
            if (response.status === 200 && response.data === true) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            if (error.response) {
                const msg = error.response.data?.message || "Authentication check failed";
                toast.error(msg);
            } else {
                toast.error(error.message);
            }
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);


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