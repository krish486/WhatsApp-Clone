import { useSelector } from "react-redux"
import { friendRequestApi } from "../api/dashboardApi"
import { useState } from "react"

export const friendRequestHook = () => {

    const [reqStatus, setReqStatus] = useState(null)

    const { searchEmail } = useSelector((store) => store.friendSearching)
    const handlePendingRequest = async () => {
        await friendRequestApi(searchEmail, "pending")
        setReqStatus("pending")
    }

    return { handlePendingRequest, reqStatus }
}