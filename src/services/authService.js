import api from "../utils/api";

const register = async (email, password) =>{
    return await api.post(
        `/login`,
        {
            email, password
        });
}