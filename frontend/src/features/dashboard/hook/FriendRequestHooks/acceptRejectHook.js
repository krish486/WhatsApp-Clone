import { useDispatch } from "react-redux"
import { friendRequestApi } from "../../api/dashboardApi"
import { updateRequestStatus } from "../../state/friendSearchingSlice"

export const acceptRejectHook = () => {
    const dispatch = useDispatch()

    const handleAcceptBtn = async (email) => {
        try {
            let res = await friendRequestApi(email, "accepted")
            dispatch(updateRequestStatus(res))
        } catch (error) {
            console.log("error in handleAcceptBtn->", error.message)
        }
    }

    const handleRejectBtn = async (email) => {
        try {
            let res = await friendRequestApi(email, "rejected")
            dispatch(updateRequestStatus(res))
        } catch (error) {
            console.log("error in handleRejectBtn->", error.message)
        }
    }

    return { handleAcceptBtn, handleRejectBtn }
}