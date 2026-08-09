import { useEffect } from "react";
import { socket } from "../../../../socket/socket";

const SocketListeners = () => {

    useEffect(() => {

        const handleIncomingCall = (data) => {
            console.log("Incoming call:", data);

        };

        socket.on("incoming-vc", handleIncomingCall);

        return () => {
            socket.off("incoming-vc", handleIncomingCall);
        };

    }, []);

    return null;
};

export default SocketListeners;