import React from "react";
import {
    Mic,
    Video,
    PhoneOff,
    Maximize,
    MoreVertical,
} from "lucide-react";
import { useLocation } from "react-router";

const VideoCallingInterface = () => {

    const { state } = useLocation()
    const friend = state?.friend;

    return (
        <div
            className="
        fixed
        z-50
        bg-zinc-900
        border
        border-zinc-700
        shadow-2xl
        overflow-hidden

        inset-0
        w-full
        h-dvh
        rounded-none

        md:inset-auto
        md:top-16
        md:right-8
        md:w-212.5
        md:h-162.5
        md:rounded-2xl
    "
        >

            {/* Remote Video Area */}
            <div className="
            relative
            w-full
            h-full
            flex
            items-center
            justify-center
            bg-gray-900
        ">

                {/* Remote Video */}
                <div className="w-full h-full flex items-center justify-center">

                    <div className="text-center px-4">

                        {/* Profile */}
                        <div className="
                            w-20 h-20
                            sm:w-24 sm:h-24
                            md:w-28 md:h-28
                            mx-auto
                            rounded-full
                            text-gray-400
                            bg-gray-700
                            flex items-center justify-center
                            text-3xl
                            sm:text-4xl
                            font-semibold
                        ">
                            {friend.name.split("")[0]}
                        </div>

                        <h2 className="
                            mt-4
                            sm:mt-5
                            text-xl
                            sm:text-2xl
                            font-semibold
                            text-gray-400
                        ">
                            {friend.name.split(" ")[0]}
                        </h2>

                        <p className="
                            mt-1
                            sm:mt-2
                            text-sm
                            sm:text-base
                            text-gray-400
                        ">
                            Connecting...
                        </p>

                    </div>
                </div>


                {/* Top Bar */}
                <div className="
                    absolute
                    top-0
                    left-0
                    right-0
                    px-4
                    py-4
                    sm:px-5
                    sm:py-5
                    flex
                    items-center
                    justify-between
                    bg-linear-to-b
                    from-black/70
                    to-transparent
                ">

                    <div>
                        <h2 className="
                            text-base
                            sm:text-lg
                            text-gray-400   
                            font-semibold
                        ">
                            {friend.name.split(" ")[0]}
                        </h2>

                        <p className="
                            text-xs
                            sm:text-sm
                            text-gray-300
                        ">
                            00:00
                        </p>
                    </div>

                    <button className="
                        p-2
                        sm:p-3
                        rounded-full
                        hover:bg-white/10
                        active:bg-white/20
                        transition
                    ">
                        <MoreVertical
                            size={20}
                            className="sm:w-5.5 sm:h-5.5"
                        />
                    </button>

                </div>


                {/* Local Video Preview */}
                <div className="
                    absolute
                    top-20
                    right-3

                    w-24
                    h-32

                    xs:w-28
                    xs:h-36

                    sm:top-20
                    sm:right-5
                    sm:w-36
                    sm:h-48

                    md:w-40
                    md:h-52

                    bg-gray-800
                    rounded-lg
                    sm:rounded-xl
                    overflow-hidden
                    shadow-2xl
                    border
                    border-white/10
                ">

                    <div className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        text-xs
                        sm:text-sm
                        text-center
                    ">
                        Your Video
                    </div>

                    <button className="
                        absolute
                        bottom-1.5
                        right-1.5
                        sm:bottom-2
                        sm:right-2
                        p-1.5
                        sm:p-2
                        rounded-full
                        bg-black/50
                        hover:bg-black/70
                        transition
                    ">
                        <Maximize
                            className="text-gray-400"
                            size={13}
                        />
                    </button>

                </div>


                {/* Bottom Controls */}
                <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0

                    pb-6
                    sm:pb-8

                    pt-16
                    sm:pt-20

                    flex
                    justify-center

                    bg-linear-to-t
                    from-black/90
                    via-black/40
                    to-transparent
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                        sm:gap-4
                        md:gap-6
                    ">

                        {/* Mic */}
                        <button className="
                            w-11
                            h-11

                            sm:w-13
                            sm:h-13

                            md:w-14
                            md:h-14

                            rounded-full
                            bg-gray-700
                            hover:bg-gray-600
                            active:scale-95
                            flex
                            items-center
                            justify-center
                            transition
                        ">
                            <Mic size={19} className="sm:w-5.5 sm:h-5.5" />
                        </button>


                        {/* Camera */}
                        <button className="
                            w-11
                            h-11

                            sm:w-13
                            sm:h-13

                            md:w-14
                            md:h-14

                            rounded-full
                            bg-gray-700
                            hover:bg-gray-600
                            active:scale-95
                            flex
                            items-center
                            justify-center
                            transition
                        ">
                            <Video size={19} className="sm:w-5.5 sm:h-5.5" />
                        </button>


                        {/* End Call */}
                        <button className="
                            w-13
                            h-13

                            sm:w-15
                            sm:h-15

                            md:w-16
                            md:h-16

                            rounded-full
                            bg-red-600
                            hover:bg-red-700
                            active:scale-95
                            flex
                            items-center
                            justify-center
                            transition
                            shadow-lg
                        ">
                            <PhoneOff
                                size={22}
                                className="sm:w-5.5 sm:h-5.5"
                            />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default VideoCallingInterface;
