import { apiInstance } from "../../../config/axios-Instance/axiosInstance"

export const searchFriend = async (friend) => {
    try {
        console.log("friend--->", friend)
        let res = await apiInstance.post("/user/friend/search", { friend })
        console.log("this is res->", res)

    } catch (error) {
        console.log("error in search Friend--->", error.message)
    }
}