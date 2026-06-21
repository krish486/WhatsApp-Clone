import { createBrowserRouter } from "react-router"
import AuthLayout from "../Layout/AuthLayout"
import Login from "../features/auth/ui/pages/Login"
import ProtectedLayout from "../Layout/ProtectedLayout"
import Home from "../features/dashboard/ui/pages/Home"


let routes = createBrowserRouter([
    {
        path: "/login",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])

export default routes