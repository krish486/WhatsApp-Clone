import { useDispatch } from "react-redux"
import { logOutApi } from "../../api/dashboardApi"
import { removeUser } from "../../../auth/state/AuthSlice"
import { socket } from "../../../../socket/socket"

export const logOutHook = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logOutApi();
        socket.disconnect();
        dispatch(removeUser())
    }

    return { handleLogout }
}