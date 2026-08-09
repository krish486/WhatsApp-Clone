import React from "react";
import { Phone, PhoneOff, Video } from "lucide-react";

const IncommingCall = ({ caller }) => {
    return (
        <div className="
            fixed
            z-100
            bottom-5
            right-5

            w-[calc(100%-2rem)]
            max-w-sm

            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200

            p-5

            animate-in
            slide-in-from-bottom-5
            duration-300
        ">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Incoming Video Call
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-gray-800">
                        {caller?.name || "Unknown User"}
                    </h2>
                </div>

                <div className="
                    w-12
                    h-12
                    rounded-full
                    bg-green-100
                    flex
                    items-center
                    justify-center
                ">
                    <Video
                        size={23}
                        className="text-green-600"
                    />
                </div>

            </div>


            {/* Caller */}
            <div className="
                mt-5
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                bg-gray-50
            ">

                <div className="
                    w-14
                    h-14
                    rounded-full
                    bg-gray-200
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-semibold
                    text-gray-600
                    overflow-hidden
                ">
                    {caller?.picture ? (
                        <img
                            src={caller.picture}
                            alt={caller.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        caller?.name?.charAt(0)?.toUpperCase() || "?"
                    )}
                </div>

                <div>
                    <p className="font-medium text-gray-800">
                        {caller?.name || "Someone"}
                    </p>

                    <p className="text-sm text-gray-500">
                        wants to video call you
                    </p>
                </div>

            </div>


            {/* Buttons */}
            <div className="
                mt-5
                flex
                items-center
                gap-3
            ">

                {/* Reject */}
                <button
                    className="
                        flex-1
                        h-12
                        rounded-xl
                        bg-gray-100
                        hover:bg-gray-200
                        text-gray-700
                        font-medium
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                        active:scale-95
                    "
                >
                    <PhoneOff size={19} />
                    Decline
                </button>


                {/* Accept */}
                <button
                    className="
                        flex-1
                        h-12
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        font-medium
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                        active:scale-95
                        shadow-md
                    "
                >
                    <Phone size={19} />
                    Accept
                </button>

            </div>

        </div>
    );
};

export default IncommingCall;