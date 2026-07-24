import React, { useRef } from "react";
import {
    Phone,
    Video,
    MoreVertical,
    Smile,
    Paperclip,
    SendHorizontal,
} from "lucide-react";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";
import { chatPageHook } from "../../hook/FriendChatHook/chatPageHook";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
// import { chatPageHook } from "../../hook/FriendChatHook/chatPageHook";

const UserChat = () => {
    const chatContainerRef = useRef(null)
    const chat = useOutletContext();
    const navigate = useNavigate()
    const {
        selectedFriend,
        messages,
        text,
        setText,
        sendMessage,
        currentUserId
    } = chat;
    if (!selectedFriend) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[#efeae2]">
                <div className="text-center">
                    <div className="text-7xl mb-5">💬</div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        Welcome to Chat Freely
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Select a friend to start your conversation.
                    </p>
                </div>
            </div>
        );
    }

    //a small buisness logic to scroll down the UI page
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-screen w-full bg-[#efeae2] py-2">

            {/* Header */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-5 shadow-sm">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            chat.hideNav(false);
                            chat.setSelectedFriend(null);
                            navigate("/");
                        }}
                        className="md:hidden"
                    >
                        <ArrowLeft />
                    </button>
                    <img
                        src={selectedFriend.picture}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover"
                    />

                    <div>
                        <h2 className="font-semibold text-gray-800">
                            {selectedFriend.name}
                        </h2>

                        <p className="text-sm text-green-600">
                            Online
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-5 text-gray-600">
                    <Video className="cursor-pointer hover:text-black" size={22} />
                    <Phone className="cursor-pointer hover:text-black" size={22} />
                    <MoreVertical className="cursor-pointer hover:text-black" size={22} />
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/white-wall-3.png')",
                }}
            >
                {messages.map((msg) =>
                    msg.senderId === currentUserId ? (
                        <SendMessage
                            key={msg._id}
                            message={msg.chat}
                            time={msg.time}
                        />
                    ) : (
                        <RecievedMessage
                            key={msg._id}
                            message={msg.chat}
                            time={msg.time}
                        />
                    )
                )}

            </div>

            {/* Bottom Input */}
            <div className="bg-white border-t px-4 py-3 flex items-center gap-3">

                <Smile
                    size={24}
                    className="text-gray-500 cursor-pointer"
                />

                <Paperclip
                    size={22}
                    className="text-gray-500 cursor-pointer"
                />

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none"
                />

                <button onClick={sendMessage} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition">
                    <SendHorizontal size={20} />
                </button>

            </div>
        </div >
    );
};

export default UserChat;