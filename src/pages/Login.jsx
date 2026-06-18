// This is the Login Page

import {Link} from "react-router-dom";
import {assets} from "../assets/assets";

const Login = () => {
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
                <Link to="/" style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    textDecoration: "none",
                }}>
                    <img src={assets.logo} alt="logo" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">Auth</span>
                </Link>
            </div>


            <div className="card p-4" style={{maxHeight: "400px", width: "100%"}}>
                <h4 className="text-center mb-4"> Login</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input type="text"
                               id="email" name="email" className="form-control" required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password"
                               name="password"
                               placeholder="**********"
                               className="form-control" required
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;