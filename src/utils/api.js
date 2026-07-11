import axios from "axios";
import { App_Constants } from "./constants";

const api = axios.create({
    baseURL: App_Constants.BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;