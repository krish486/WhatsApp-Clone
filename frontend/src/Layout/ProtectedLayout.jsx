import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import SideBar from "../features/dashboard/ui/components/SideBar";
import SocketListeners from "../features/dashboard/ui/components/SocketListeners";

const ProtectedLayout = () => {

    const { isLoading, isAuth } = useSelector(
        (store) => store.auth
    );

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <SocketListeners />
            <SideBar />

            <main className="md:ml-64 pb-20 md:pb-0">
                <Outlet />
            </main>

        </div>
    );
};

export default ProtectedLayout;