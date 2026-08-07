import { useSelector } from "react-redux"
import { socket } from "../../../../socket/socket"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

export const videoCallHook = () => {
    const { user } = useSelector((store) => store.auth)
    const [roomId, setRoomId] = useState(Math.floor(Math.random() * Math.pow(10, 10)))

    const navigate = useNavigate()

    const { pathname } = useLocation()


    const createRoomId = () => {
        setRoomId(Math.floor(Math.random() * Math.pow(10, 10)))
    }

    const handleButtonClick = (selectedFriend) => {
        createRoomId()
        socket.emit("create-vc", {
            recieverEmail: selectedFriend.email,
            senderEmail: user.email,
            roomId
        })
    }

    const redirect_Vc_URL = ({ roomId }) => {
        navigate(`${pathname}/call/${roomId}`)
    }

    useEffect(() => {
        socket.on("created-vc", redirect_Vc_URL)
        return () => {
            socket.off('joined-room', redirect_Vc_URL)
        }
    }, [socket, redirect_Vc_URL])

    return { handleButtonClick }
}