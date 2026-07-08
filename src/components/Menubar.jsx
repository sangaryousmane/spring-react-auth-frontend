// For app Menubar

import {assets} from "../assets/assets";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext";
import axios from "axios";
import {toast} from "react-toastify";

const Menubar = () => {
    const navigate = useNavigate();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setDropDownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${backendURL}/logout`);
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

        const sendVerificationOTP = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.post(
                    `${backendURL}/send-otp`
                )
                if (response.status === 200) {
                    navigate("/email-verify");
                    toast.success("OTP sent successfully");
                } else {
                    toast.error("Unable to send OTP.");
                }
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }

        return (
            <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <img src={assets.logo_home} alt="logo" width={32} height={32}/>
                    <span className="fw-bold fs-4 text-dark">Auth</span>
                </div>

                {userData ?
                    (
                        <div className="position-relative" ref={dropDownRef}>
                            <div
                                className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                    userSelect: "none",
                                }} onClick={() => setDropDownOpen(prev => !prev)}>

                                {userData.name.charAt(0).toUpperCase()}
                            </div>

                            {/*Show and make visible the verify email address if the account is not verify.*/}
                            {dropDownOpen && (
                                <div className="position-absolute shadow bg-white rounded p-2"
                                     style={{
                                         top: "50px",
                                         right: 0,
                                         zIndex: 1000
                                     }}>

                                    {
                                        !userData.isAccountVerified && (
                                            <div className="dropdown-item py-1 px-2"
                                                 style={{cursor: "pointer"}} onClick={sendVerificationOTP}> Verify Email
                                            </div>
                                        )}
                                    <div className="dropdown-item py-1 px-2 text-danger"
                                         style={{
                                             cursor: "pointer"
                                         }} onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="btn btn-outline-dark rounded-pill px-3"
                             onClick={() => navigate("/login")}>
                            Login <i className="bi bi-arrow-right ms-2"></i>
                        </div>
                    )}
            </nav>
        )
}

export default Menubar;