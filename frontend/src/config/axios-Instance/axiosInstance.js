import axios from "axios"

export const apiInstance = axios.create({
    baseURL: "http://localhost:3000" || "https://whatsapp-clone-ipnq.onrender.com",
    withCredentials: true
})