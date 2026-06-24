import { useSelector } from "react-redux"
import { friendRequestApi } from "../api/dashboardApi"
import { useState } from "react"

export const friendRequestHook = () => {

    const [reqStatus, setReqStatus] = useState(null)

    const { searchEmail } = useSelector((store) => store.friendSearching)
    const handleRequest = async () => {
        await friendRequestApi(searchEmail, "pending")
        setReqStatus("pending")
    }

    return { handleRequest, reqStatus }
}