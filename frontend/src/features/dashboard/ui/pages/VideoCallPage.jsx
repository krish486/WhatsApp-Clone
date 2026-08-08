import React from "react";
import { videoCallHook } from "../../hook/videoCallHook/videoCallHook";
import VideoCallAnswerInterface from "../components/VideoCallAnswerInterface";
import VideoCallingInterface from "../components/VideoCallingInterface";


const VideoCallPage = () => {
    const { redirect_original_chat, friend } = videoCallHook()

    const { callState } = videoCallHook()
    if (callState === "calling") {
        return (
            <VideoCallingInterface />
        )
    }

    return (
        <VideoCallAnswerInterface redirect_original_chat={redirect_original_chat} />
    );
};

export default VideoCallPage;