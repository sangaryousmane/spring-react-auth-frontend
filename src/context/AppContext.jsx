import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {authService, profileService} from "../services";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const response = await profileService.getProfile(`/profile`)

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
            const response = await authService.getAuthState();
            if (response.status === 200 && response.data === true) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                // User is simply not logged in
                setIsLoggedIn(false);
                setUserData(null);
                return;
            }
        }
    }

    useEffect(() => {
        void getAuthState();
    }, []);


    const contextValue = {
        isLoggedIn, setIsLoggedIn,
        userData, setUserData, getUserData, getAuthState
    }

    return (
        <AppContext.Provider value={contextValue}>
              {props.children}
        </AppContext.Provider>
    )
}