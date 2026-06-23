import { createBrowserRouter } from "react-router"
import AuthLayout from "../Layout/AuthLayout"
import Login from "../features/auth/ui/pages/Login"
import ProtectedLayout from "../Layout/ProtectedLayout"
import ChatsPage from "../features/dashboard/ui/pages/ChatsPage"
import FriendListPage from "../features/dashboard/ui/pages/FriendListPage"
import ProfilePage from "../features/dashboard/ui/pages/ProfilePage"


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
                element: <ChatsPage />
            },
            {
                path: "/friend-list",
                element: <FriendListPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    }
])

export default routes