import { apiInstance } from "../../../config/axios-Instance/axiosInstance"

export const searchFriend = async (friend) => {
    try {
        let res = await apiInstance.post("/user/friend/search", { friend })
        return res.data.buddy

    } catch (error) {
        console.log("error in search Friend--->", error.message)
    }
}

export const friendRequestApi = async (email, status) => {
    try {
        let res = await apiInstance.post("/user/friend/request", { email, status });
        return res.data.status
    } catch (error) {
        console.log("error in friend request api->", error.message)
    }
}