// This is the Login Page

import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets";
import {useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {AppContext} from "../context/AppContext";

const Login = () => {
    const {backendURL} = useContext(AppContext);
    const navigate = useNavigate();
    const [isCreateAccount, setIsCreateAccount] = useState(true);
    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);

        try{
            if (isCreateAccount){
                // Register API
                const response = await axios.post(`${backendURL}/register`, {fullName, email, password})
                if (response.status === 201){
                    navigate("/");
                    toast.success("Account created successfully.");
                } else {
                    toast.error("Email already exists!");
                }
            } else {
                // Login API

            }
        } catch(err){
            toast.error(err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
        style={{
            background: "linear-gradient(90deg, #6a5af9, #8268f9)",
            border: "none"}}>

            <div style={{
                position: "absolute",
                top: "20px",
                left: "30px",
                display: "flex",
                alignItems: "center",}}>
                <Link to="/" style={{ fontWeight: "bold", fontSize: "24px", textDecoration: "none",}}>
                    <img src={assets.logo} alt="logo" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">Auth</span>
                </Link>
            </div>

            <div className="card p-4" style={{maxWidth: "400px", width: "100%"}}>
                <h2 className="text-center mb-4">{isCreateAccount ? "Create Account" : "Login"}</h2>
                <form onSubmit={onSubmitHandler}>

                    {
                        isCreateAccount && (
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control"
                                       id="fullName" placeholder="Full Name" value={fullName}
                                onChange = {(e) => setName(e.target.value)}/>
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input type="text" id="email" name="email" value={email} placeholder="Enter your email"
                               className="form-control"
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={password} placeholder="**********"
                               className="form-control"
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <Link to="/reset-password" className="text-decoration-none"> Forgot Password? </Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
                    </button>

                </form>

                <div className="text-center mt-3">
                    <p className="mb-0">
                        {isCreateAccount ?
                            (
                                <>
                                    Already have an account? {" "}
                                    <span className="text-decoration-underline"
                                          onClick={() => setIsCreateAccount(false)}
                                          style={{cursor: "pointer"}}>
                                    Login here
                                </span>
                                </>
                            ):(
                                <>
                                    Don't have an account? {" "}
                                    <span className="text-decoration-underline"
                                          onClick={() => setIsCreateAccount(true)}
                                          style={{cursor: "pointer"}}>
                                        Sign Up
                                    </span>
                                </>
                            )
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;