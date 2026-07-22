import { Outlet } from "react-router";
import FriendList from "../components/FriendList";
import { chatPageHook } from "../../hook/FriendChatHook/chatPageHook";

const ChatsPage = () => {

    const chat = chatPageHook();

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-100">

            <div className="md:hidden">

                {chat.selectedFriend ? (
                    <Outlet context={chat} />
                ) : (
                    <FriendList chat={chat} />
                )}

            </div>

            <div className="hidden md:flex w-full h-screen">

                <div className="w-80 border-r">
                    <FriendList chat={chat} />
                </div>

                <div className="flex-1">
                    <Outlet context={chat} />
                </div>

            </div>

        </div>
    );
};

export default ChatsPage;