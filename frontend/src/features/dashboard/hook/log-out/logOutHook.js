import { useDispatch } from "react-redux"
import { logOutApi } from "../../api/dashboardApi"
import { removeUser } from "../../../auth/state/AuthSlice"

export const logOutHook = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logOutApi();
        dispatch(removeUser())
    }

    return { handleLogout }
}