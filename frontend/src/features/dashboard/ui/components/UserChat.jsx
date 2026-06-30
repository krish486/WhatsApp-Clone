import React from "react";
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

const UserChat = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-[#efeae2] py-2">

            {/* Header */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-5 shadow-sm">

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt=""
                        className="w-11 h-11 rounded-full object-cover"
                    />

                    <div>
                        <h2 className="font-semibold text-gray-800">
                            Harsh Patel
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
                className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/white-wall-3.png')",
                }}
            >
                {/* Received */}
                <RecievedMessage message={"Hello bro"} time={"10:20 AM"} />

                {/* Sent */}
                <SendMessage message={"Hi Bro 😄"} time={"10:21 AM"} />


                <RecievedMessage message={"Yeh WhatsApp style UI hai. Bas messages map kar dena backend se."} time={"10:22 AM"} />

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
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none"
                />

                <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition">
                    <SendHorizontal size={20} />
                </button>

            </div>
        </div >
    );
};

export default UserChat;