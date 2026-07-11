// This is the Email Verification Page

import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext";
import {toast} from "react-toastify";
import {emailService} from "../services";

const EmailVerify = () => {
    const inputRef = useRef([]);
    const [loading, settLoading] = useState(false);
    const {getUserData, isLoggedIn, userData} = useContext(AppContext);
    const navigate = useNavigate();

    const handleVerify = async () => {
        const otp = inputRef.current.map(i => i.value).join("");
        if (otp.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        settLoading(true);

        try {
            const response = await emailService.verifyOTP(
                `/verify-otp`, {
                    otp
                })

            if (response.status === 200) {
                toast.success("OTP Verification Successful");
                getUserData();
                navigate("/");
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message || "OTP Verification Failed. Please try again.");
        } finally {
            settLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/")
    }, [isLoggedIn, userData]);

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
            style={{
                background: "linear-gradient(90deg,#6a5af9,#8268f9)"
            }}
        >

            <Link
                to="/"
                className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
            >
                <img
                    src={assets.logo}
                    alt="logo"
                    width={32}
                    height={32}
                />

                <span className="text-light fs-4 fw-bold">
                Authify
            </span>

            </Link>

            <div
                className="bg-white rounded-4 shadow p-5"
                style={{
                    maxWidth: "420px",
                    width: "100%"
                }}
            >

                <h3 className="fw-bold text-center mb-2">
                    Email Verification
                </h3>

                <p className="text-center text-muted mb-4">
                    Enter the 6-digit verification code sent to your email.
                </p>

                <div className="d-flex justify-content-between gap-2 mb-4">

                    {[...Array(6)].map((_, i) => (

                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="form-control text-center fs-4"
                            ref={(el) =>
                                (inputRef.current[i] = el)
                            }
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                            onChange={(e) => {

                                if (e.target.value && i < 5) {
                                    inputRef.current[i + 1].focus();
                                }

                            }}
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Backspace" &&
                                    !e.target.value &&
                                    i > 0
                                ) {
                                    inputRef.current[i - 1].focus();
                                }

                            }}
                            onPaste={(e) => {

                                e.preventDefault();

                                const pasted = e.clipboardData
                                    .getData("text")
                                    .trim();

                                if (!/^\d{6}$/.test(pasted)) return;

                                pasted.split("").forEach((digit, index) => {
                                    inputRef.current[index].value = digit;
                                });

                                inputRef.current[5].focus();

                            }}
                            onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                            onChange={(e) => {

                                if (e.target.value && i < 5) {
                                    inputRef.current[i + 1].focus();
                                }

                            }}

                            onKeyDown={(e) => {

                                if (
                                    e.key === "Backspace" &&
                                    !e.target.value &&
                                    i > 0
                                ) {
                                    inputRef.current[i - 1].focus();
                                }

                            }}

                            onPaste={(e) => {

                                e.preventDefault();

                                const pasted = e.clipboardData
                                    .getData("text")
                                    .trim();

                                if (!/^\d{6}$/.test(pasted)) return;

                                pasted.split("").forEach((digit, index) => {
                                    inputRef.current[index].value = digit;
                                });

                                inputRef.current[5].focus();

                            }}
                        />

                    ))}

                </div>

                <button
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={loading} onClick={handleVerify}
                >
                    {loading
                        ? "Verifying..."
                        : "Verify Email"}
                </button>

            </div>

        </div>
    );
}
export default EmailVerify;