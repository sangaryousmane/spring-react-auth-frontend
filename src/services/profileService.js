// This is the profile service API handling

import api from "../utils/api";

const profileService = {

    getProfile() {
        return api.get("/profile");
    },

    updateProfile(data) {
        return api.put("/profile", data);
    }
}

export default profileService;