import { useSelector } from "react-redux"
import { socket } from "../../../../socket/socket"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

export const videoCallHook = () => {
    const { user } = useSelector((store) => store.auth)
    const [roomId, setRoomId] = useState(Math.floor(Math.random() * Math.pow(10, 10)))

    const [callState, setCallState] = useState("calling")

    const [friend, setFriend] = useState()

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const redirect_original_chat = () => {
        const chatPath = pathname.split("/").slice(0, 3).join("/");
        navigate(chatPath);
    };

    const createRoomId = () => {
        setRoomId(Math.floor(Math.random() * Math.pow(10, 10)))
    }

    const handleButtonClick = (selectedFriend) => {
        setFriend(selectedFriend)
        createRoomId()
        socket.emit("create-vc", {
            recieverEmail: selectedFriend.email,
            senderEmail: user.email,
            roomId
        })
    }

    const redirect_Vc_URL = useCallback(({ roomId }) => {
        navigate(`${pathname}/call/${roomId}`, {
            state: { friend }
        });

    }, [navigate, pathname, friend]);

    useEffect(() => {
        socket.on("created-vc", redirect_Vc_URL)
        return () => {
            socket.off('created-vc', redirect_Vc_URL)
        }
    }, [socket, redirect_Vc_URL])

    return { handleButtonClick, redirect_original_chat, callState, friend }
}