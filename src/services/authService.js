import api from "../utils/api";

// This service handles all the authentication services.
const authService = {

    register(data)  {
        return api.post("/register", data);
    },

    login(data) {
        return api.post("/login", data);
    },

    logout() {
        return api.post("/logout");
    },

    getAuthState(){
        return api.get("/is-authenticated");
    }
}

export default authService;