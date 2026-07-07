import { apiInstance } from "../../../config/axios-Instance/axiosInstance";

export const googleWindowLocation = () => {
    // return "https://whatsapp-clone-ipnq.onrender.com/api/auth/google";
    return "http://localhost:3000/api/auth/google";
}

export const getMeApi = async () => {
    const res = await apiInstance.get("/auth/me")
    return res.data.value
}