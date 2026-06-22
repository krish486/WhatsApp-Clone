import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { addUser } from '../features/auth/state/AuthSlice'
import { getMeApi } from '../features/auth/api/authApi'

const AuthLayout = () => {
    const { isLoading, isAuth } = useSelector((store) => store.auth)
    let dispatch = useDispatch()

    useEffect(() => {
        const sendData = async () => {
            try {
                const data = await getMeApi();
                dispatch(addUser(data));
            } catch (err) {
                console.error(err);
            }
        };
        sendData();
    }, []);
    if (isAuth) {
        return <Navigate to={"/"} />
    }
    return (
        <Outlet />
    )
}

export default AuthLayout
