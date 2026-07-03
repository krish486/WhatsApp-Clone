import { apiInstance } from "../../../config/axios-Instance/axiosInstance"

export const fetchMessageApi = async (friendId) => {
    try {
        const res = await apiInstance.get(`/chats/watch/${friendId}`)
        console.log("this is res-->", res)
    } catch (error) {
        console.log("error in fetchMessageApi->", error.message)
    }
}