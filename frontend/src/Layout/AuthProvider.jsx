import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMeApi } from "../features/auth/api/authApi";
import { addUser, removeUser } from "../features/auth/state/AuthSlice";

import { socket } from "../socket/socket";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {

        const verifyUser = async () => {

            try {

                const user = await getMeApi();

                dispatch(addUser(user));

                if (!socket.connected) {
                    socket.connect();
                }

                socket.emit("join", user.id);

            } catch (error) {

                dispatch(removeUser());

                if (socket.connected) {
                    socket.disconnect();
                }

            }

        };

        verifyUser();

        return () => {

            if (socket.connected) {
                socket.disconnect();
            }

        };

    }, []);

    return children;
};

export default AuthProvider;