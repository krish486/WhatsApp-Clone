import React from 'react'
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    MonitorUp,
    Settings,
    Maximize2,
    Minimize2,
} from "lucide-react";

const VideoCallAnswerInterface = ({ redirect_original_chat }) => {
    return (
        <div className="fixed top-16 right-8 w-212.5 h-130 bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-700 flex flex-col">

            {/* Header */}
            <div className="h-14 bg-zinc-800 flex items-center justify-between px-5 cursor-move">
                <div>
                    <h2 className="text-white font-semibold text-lg">
                        Video Call
                    </h2>
                    <p className="text-sm text-zinc-400">
                        Connected with b@.com
                    </p>
                </div>

                <div className="flex gap-3 text-zinc-300">
                    <button className="hover:text-white">
                        <Minimize2 size={18} />
                    </button>

                    <button className="hover:text-white">
                        <Maximize2 size={18} />
                    </button>

                    <button
                        onClick={redirect_original_chat}
                        className="hover:text-red-500">
                        ✕
                    </button>
                </div>
            </div>

            {/* Videos */}
            <div className="flex-1 relative bg-black">

                {/* Remote Video */}
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                />

                {/* Local Video */}
                <div className="absolute bottom-5 right-5 w-56 h-36 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-zinc-900">
                    <video
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                    />
                </div>

            </div>

            {/* Controls */}
            <div className="h-20 bg-zinc-800 flex justify-center items-center gap-5">

                <button className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center">
                    <Mic className="text-white" />
                </button>

                <button className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center">
                    <Video className="text-white" />
                </button>

                <button className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center">
                    <MonitorUp className="text-white" />
                </button>

                <button className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center">
                    <Settings className="text-white" />
                </button>

                <button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center">
                    <PhoneOff className="text-white" />
                </button>

            </div>

        </div>
    )
}

export default VideoCallAnswerInterface
