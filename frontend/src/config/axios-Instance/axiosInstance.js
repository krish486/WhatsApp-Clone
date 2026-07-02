import axios from "axios";
import { parentApi } from "../parent-api/parentApi";

export const apiInstance = axios.create({
    baseURL: parentApi(),
    withCredentials: true
});

apiInstance.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalReq = error.config;

        if (
            error.response?.status === 401 &&
            !originalReq._retry &&
            !originalReq.url.includes("/auth/refreshToken")
        ) {

            originalReq._retry = true;

            try {

                await axios.get("http://localhost:3000/auth/refreshToken", { withCredentials: true });

                return apiInstance(originalReq);

            } catch (err) {

                console.log("Refresh Token Expired");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);