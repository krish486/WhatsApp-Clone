import React, { useState } from "react";
import FriendList from "../components/FriendList";
import UserChat from "../components/UserChat";
import { chatPageHook } from "../../hook/FriendChatHook/chatPageHook";

const ChatsPage = () => {
    const chat = chatPageHook();
    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-100">

            <>
                {/* Mobile */}

                <div className="md:hidden">

                    {chat.selectedFriend ? (

                        <UserChat chat={chat} />

                    ) : (

                        <FriendList chat={chat} />

                    )}

                </div>

                {/* Desktop */}

                <div className="hidden md:flex w-full h-screen">

                    <div className="w-80 border-r">

                        <FriendList chat={chat} />

                    </div>

                    <div className="flex-1">

                        <UserChat chat={chat} />

                    </div>

                </div>
            </>

        </div>
    );
};

export default ChatsPage;