import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import IncommingCall from "./videoCall/IncommingCall";

const SocketListeners = () => {

    const [roomId, setRoomId] = useState()

    const handleIncomingCall = (data) => {
        console.log("Incoming call:", data);
        setRoomId(data.roomId)
    };

    useEffect(() => {

        socket.on("incoming-vc", handleIncomingCall);

        return () => {
            socket.off("incoming-vc", handleIncomingCall);
        };

    }, [handleIncomingCall]);
    if (roomId) {
        return <IncommingCall />
    }
    return null;
};

export default SocketListeners;