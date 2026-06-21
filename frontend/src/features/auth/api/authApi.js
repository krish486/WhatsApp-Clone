import { apiInstance } from "../../../config/axios-Instance/axiosInstance";

export const googleWindowLocation = () => {
    const url = "http://localhost:3000/auth/google" || "https://whatsapp-clone-ipnq.onrender.com/auth/google/callback";
    return url
}

export const getMeApi = async () => {
    const res = await apiInstance.get("/auth/me")
    return res.data.value
}