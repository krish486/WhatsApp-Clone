import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getMeApi } from "../features/auth/api/authApi";
import { addUser, logout } from "../features/auth/state/AuthSlice";
import SideBar from "../features/dashboard/ui/components/SideBar";
import { socket } from "../socket/socket";

const ProtectedLayout = () => {
    const { isLoading, isAuth } = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const data = await getMeApi();
                dispatch(addUser(data));
                if (!socket.connected) {
                    socket.connect();
                }
                socket.emit("join", data.id);
            } catch (err) {
                dispatch(logout());
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
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-20 h-20"
                    />

                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>

                    <p className="text-gray-600 font-medium">
                        Connecting...
                    </p>

                </div>

            </div>
        );

    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <SideBar />
            <main className="md:ml-64 pb-20 md:pb-0">
                <Outlet />
            </main>
        </div>
    );
};
export default ProtectedLayout;