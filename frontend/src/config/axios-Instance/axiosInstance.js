import axios from "axios"

export const apiInstance = axios.create({
    baseURL: "http://localhost:3000" || "https://whatsapp-clone-ipnq.onrender.com",
    withCredentials: true
})



apiInstance.interceptors.response.use((response) => response,
    async (error) => {
        const originalReq = error.config;
        if (
            error.response?.status === 401 &&
            !originalReq._retry
        ) {
            originalReq._retry = true;
            try {

                await api.post("/auth/refreshToken");

                return api(originalRequest);

            }
            catch (err) {

                console.log("Refresh Token Expired");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)