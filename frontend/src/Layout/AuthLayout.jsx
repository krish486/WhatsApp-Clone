import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AuthLayout = () => {

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

    if (isAuth) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AuthLayout;