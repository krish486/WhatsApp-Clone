import React, { useState } from "react";
import FriendList from "../components/FriendList";
import UserChat from "../components/UserChat";
import { chatPageHook } from "../../hook/FriendChatHook/chatPageHook";

const ChatsPage = () => {
    const chat = chatPageHook();
    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-100">

            {/* Friend List */}
            <div className="w-full md:w-80 lg:w-96 border-r bg-white">
                <FriendList chat={chat} />
            </div>

            {/* Chat Section */}
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
                {/* <h1 className="text-gray-500 text-xl font-medium">
                    Select a chat to start messaging
                </h1> */}
                <UserChat chat={chat} />
            </div>

        </div>
    );
};

export default ChatsPage;