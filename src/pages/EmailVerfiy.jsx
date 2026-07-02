// This is the Email Verification Page

import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets";
import {useContext, useRef, useState} from "react";
import {AppContext} from "../context/AppContext";

const EmailVerify = () => {
    const inputRef = useRef([]);
    const [loading, settLoading] = useState(false);
    const {getUserData, isLoggedIn, userData} = useContext(AppContext);
    const navigate = useNavigate();

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
                        />

                    ))}

                </div>

                <button
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={loading}
                >
                    {loading
                        ? "Loading..."
                        : "Verify Email"}
                </button>

            </div>

        </div>
    );
}
export default EmailVerify;