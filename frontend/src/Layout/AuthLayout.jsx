import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AuthLayout = () => {
    const { isLoading, isAuth } = useSelector((store) => store.auth);

    if (isAuth) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AuthLayout;