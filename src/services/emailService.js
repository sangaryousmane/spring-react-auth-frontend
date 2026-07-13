// This is the email service API handling

import api from "../utils/api";

const emailService = {

    sendOTP () {
        return api.post("/send-otp");
    },

    verifyOTP (otp) {
        return api.post(`/verify-otp`, {
            otp
        });
    },

    resetPassword(data) {
        return api.post("/reset-password", data);
    },

    sendResetPassword(email, newPassword) {
        return api.post("/send-reset-otp?email="+email+"&newPassword="+newPassword);
    }
}

export default  emailService;