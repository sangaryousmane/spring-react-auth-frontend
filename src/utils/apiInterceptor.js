import api from './api';
import {authService} from "../services";


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401
            && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {

                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject
                    });

                }).then(() => api(originalRequest));
            }
            isRefreshing = true;
            try {
                await authService.refreshToken();
                processQueue();
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError);
                window.location.href = "/login";
                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

