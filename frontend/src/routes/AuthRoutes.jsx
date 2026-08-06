import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import ProtectedLayout from "../Layout/ProtectedLayout";

import Login from "../features/auth/ui/pages/Login";
import ChatsPage from "../features/dashboard/ui/pages/ChatsPage";
import FriendListPage from "../features/dashboard/ui/pages/FriendListPage";
import ProfilePage from "../features/dashboard/ui/pages/ProfilePage";
import UserChat from "../features/dashboard/ui/components/UserChat";
import VideoCallPage from "../features/dashboard/ui/pages/VideoCallPage";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "",
                element: <ChatsPage />,
                children: [
                    {
                        path: "chat/:friendId",
                        element: <UserChat />,
                    },
                    {
                        path: "chat/:friendId/call/:roomId",
                        element: <VideoCallPage />,
                    }
                ],
            },
            {
                path: "friend-list",
                element: <FriendListPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
]);

export default routes;