import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets";
import {useContext, useRef, useState} from "react";
import {AppContext} from "../context/AppContext";
import {emailService} from "../services";
import {toast} from "react-toastify";


const ResetPassword = () => {

    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {getUserData, isLoggedIn, userData, backendURL} = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOTPSubmitted, setOTPSubmitted] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);


    // Handle APIs
    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response =  await emailService.sendResetPassword(email, newPassword);
            if (response.status === 200){
                toast.success("Password reset OTP sent successfully!");
                setIsEmailSent(true);
            } else {
                toast.error("Something went wrong, please try again.");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e, i) => {
        if (
            e.key === "Backspace" &&
            !e.target.value &&
            i > 0
        ) {
            inputRef.current[i - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .trim();

        if (!/^\d{6}$/.test(pasted)) return;

        pasted.split("").forEach((digit, i) => {
            inputRef.current[i].value = digit;
        });

        inputRef.current[5].focus();
    }

    const handleChange = (e, i) => {
        const value = e.target.value.replace(/\D/,"");
        e.target.value = value;

        if (value && i < 5){
            inputRef.current[i + 1].focus();
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 position-relative"
        style={{
            background: 'linear-gradient(90deg, #6a5af9, #8268f9)',
            border: "none",}}>
            <Link to="/" className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none">
                <img src={assets.logo_home} height={32} width={32} alt="logo" className="img-fluid" />
                <span className="fs-4 fw-semibold text-dark">Authify</span>
            </Link>

            {/*Reset Password Card*/}
            {!isEmailSent && (
                <div className="rounded-4 p-5 text-center bg-white"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                }}>
                    <h4 className="mb-2">Reset Password</h4>
                    <p className="mb-4">Enter your registered email address</p>
                    <form onSubmit={onSubmitEmail}>
                        <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                            <span className="input-group-text bg-transparent border-0 ps-4">
                                <i className="bi bi-envelope"></i>
                            </span>

                            <input type="email" className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                            placeholder="Enter your email address"
                            style={{
                                height: "50px"
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading}>
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            {/* OTP Card*/}
            {isOTPSubmitted && (
                <div
                    className="bg-white rounded-4 shadow p-5"
                    style={{
                        maxWidth: "420px",
                        width: "100%"
                    }}>
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
                                ref={(el) => (inputRef.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                            />

                        ))}
                    </div>

                    <button className="btn btn-primary w-100 fw-semibold" disabled={loading}>
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </div>
            )}

            {/*Enter new password card*/}
            {isOTPSubmitted && isEmailSent && (
                <div className="rounded-4 p-4 text-center bg-white"
                     style={{
                         width: "100%",
                         maxWidth: "400px",
                     }}>

                    <h4>New Password</h4>
                    <p className="mb-4">Enter the new password below</p>
                    <form>
                        <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                            <span className="input-group-text bg-transparent border-0 ps-4">
                                <i className="bi bi-person-fill-lock"></i>
                            </span>
                            <input type="password"
                                   className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                                   placeholder="************"
                                   style={{height: "50px"}}
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   value={newPassword}
                                   required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            )}

        </div>
    )
}

export default ResetPassword;