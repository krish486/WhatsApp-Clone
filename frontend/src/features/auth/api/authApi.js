import { apiInstance } from "../../../config/axios-Instance/axiosInstance";

export const googleWindowLocation = () => {
    return `${import.meta.env.VITE_API_URL}/auth/google`;
}

export const getMeApi = async () => {
    const res = await apiInstance.get("/auth/me")
    return res.data.value
}