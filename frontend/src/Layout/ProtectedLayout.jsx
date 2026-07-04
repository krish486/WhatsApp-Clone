import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getMeApi } from "../features/auth/api/authApi";
import { addUser, removeUser } from "../features/auth/state/AuthSlice";

import SideBar from "../features/dashboard/ui/components/SideBar";

import { socket } from "../socket/socket";

const ProtectedLayout = () => {

    const dispatch = useDispatch();

    const { isLoading, isAuth } = useSelector(
        (store) => store.auth
    );

    useEffect(() => {

        const loadUser = async () => {

            try {

                const user = await getMeApi();

                dispatch(addUser(user));

                if (!socket.connected) {

                    socket.connect();

                }

                socket.emit("join", user.id);

            }

            catch (err) {

                console.log(err);

                dispatch(removeUser());

            }

        };

        loadUser();

        return () => {

            socket.disconnect();

        };

    }, []);

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

            <SideBar />

            <main className="md:ml-64 pb-20 md:pb-0">

                <Outlet />

            </main>

        </div>

    );

};

export default ProtectedLayout;