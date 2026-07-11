// This is the profile service API handling

import api from "../utils/api";

const profileService = {

    getProfile() {
        return api.get("/profile");
    }
}

export default profileService;