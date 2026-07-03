import { apiInstance } from "../../../config/axios-Instance/axiosInstance"

export const fetchMessageApi = async (friendId) => {
    try {
        const res = await apiInstance.get(`/chats/watch/${friendId}`)
        return res.data.data
    } catch (error) {
        console.log("error in fetchMessageApi->", error.message)
    }
}