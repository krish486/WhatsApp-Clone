import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import IncommingCall from "./videoCall/IncommingCall";

const SocketListeners = () => {

    const [roomId, setRoomId] = useState()

    const [caller, setCaller] = useState({});

    const handleIncomingCall = (data) => {
        console.log("Incoming call:", data);
        setRoomId(data.roomId)
        setCaller(
            {
                name: data.name,
                picture: data.picture,
            }
        )
    };

    useEffect(() => {

        socket.on("incoming-vc", handleIncomingCall);

        return () => {
            socket.off("incoming-vc", handleIncomingCall);
        };

    }, [handleIncomingCall]);
    if (roomId) {
        return <IncommingCall caller={caller} />
    }
    return null;
};

export default SocketListeners;