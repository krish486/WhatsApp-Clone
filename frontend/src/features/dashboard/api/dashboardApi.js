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

export const pendingRequestApi = async () => {
    try {
        let res = await apiInstance.get("user/friend/get-pending-request")
        return res.data.reqList
    } catch (error) {
        console.log("error in pending Request api", error.message)
    }
}

export const acceptedRequestApi = async () => {
    try {
        let res = await apiInstance.get("user/friend/get-accepted-request")
        return res.data.reqList
    } catch (error) {
        console.log("error in accepted request api", error.message)
    }
}

export const rejectedRequestApi = async () => {
    try {
        await apiInstance.delete("user/friend/get-rejected-request")
    } catch (error) {
        console.log("error in rejected request api", error.message)
    }
}


export const logOutApi = async () => {
    try {
        await apiInstance.get("auth/log-out")
    } catch (error) {
        console.log("error in rejected request api", error.message)
    }
}