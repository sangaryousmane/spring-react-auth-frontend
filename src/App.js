import './App.css';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerfiy";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div>
        <ToastContainer />
        <Routes>
            <Route path="/" element={<Home />} />

            {/*Login page are available to only unauthenticated users*/}
            <Route path="/login" element={
                <PublicOnlyRoute>
                    <Login />
                </PublicOnlyRoute>
            }/>

            {/* Protect the email verification page to only logged-in users */}
               <Route path="/email-verify" element={
                   <ProtectedRoute>
                       <EmailVerify />
                   </ProtectedRoute>}
               />

            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            {/* Protect the password reset page to only unauthenticated users */}
            <Route path="/reset-password" element={
                <PublicOnlyRoute>
                    <ResetPassword />
                </PublicOnlyRoute>
            } />
        </Routes>
    </div>
  );
}

export default App;
