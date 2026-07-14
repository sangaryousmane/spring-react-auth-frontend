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

    sendResetPasswordOTP(email) {
        return api.post('/send-reset-otp?email='+email);
    }
}

export default  emailService;