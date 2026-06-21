import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedLayout = () => {
    const { isLoading, isAuth } = useSelector((store) => store.auth)
    if (!isAuth) {
        return <Navigate to={"/login"} />
    }
    return (
        <Outlet />
    )
}

export default ProtectedLayout
