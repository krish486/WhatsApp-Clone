import { Navigate, Outlet } from 'react-router'
import { useSelector } from "react-redux"

const AuthLayout = () => {
    const { isLoading, isAuth } = useSelector((store) => store.auth)

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
    if (isAuth) {
        return <Navigate to={"/"} />
    }
    return (
        <Outlet />
    )
}

export default AuthLayout
