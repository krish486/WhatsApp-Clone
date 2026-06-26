import { useDispatch, useSelector } from "react-redux"
import { friendRequestApi } from "../api/dashboardApi"
import { updateRequestStatus } from "../state/friendSearchingSlice"

export const friendRequestHook = () => {
    const dispatch = useDispatch()


    const { searchEmail } = useSelector((store) => store.friendSearching)
    const handlePendingRequest = async () => {
        await friendRequestApi(searchEmail, "pending")
        dispatch(updateRequestStatus("pending"))
    }

    return { handlePendingRequest }
}