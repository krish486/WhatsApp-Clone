import { useEffect, useMemo, useRef, useState } from "react";
import { fetchMessageApi } from "../../api/chatsApi";
import { useSelector } from "react-redux";
import { socket } from "../../../../socket/socket";

export const chatPageHook = () => {
    const { user } = useSelector((store) => store.auth)
    const selectedFriendRef = useRef(null);
    const currentUserId = user.id
    const [selectedFriend, setSelectedFriend] = useState(null);
    // {
    //   friendId: [messages]
    // }
    const [chatCache, setChatCache] = useState({});
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");

    const messages = useMemo(() => {
        if (!selectedFriend) return [];
        return chatCache[selectedFriend.id] || [];
    }, [selectedFriend, chatCache]);

    const fetchMessages = async (friendId) => {
        try {
            setLoading(true);
            const res = await fetchMessageApi(friendId);
            return res;
        } finally {
            setLoading(false);
        }
    };

    const setFriendMessages = (friendId, chats) => {
        setChatCache((prev) => ({
            ...prev,
            [friendId]: chats
        }));
    };

    const selectFriend = async (friend) => {

        setSelectedFriend(friend);
        selectedFriendRef.current = friend;

        setSelectedFriend(friend);

        if (chatCache[friend.id]) {
            return;
        }

        const res = await fetchMessages(friend.id);

        const cacheKey =
            res.userId === currentUserId
                ? res.friendId
                : res.userId;

        setFriendMessages(cacheKey, res.chats);

    }

    const addMessage = (friendId, message) => {
        setChatCache((prev) => ({
            ...prev,
            [friendId]: [
                ...(prev[friendId] || []),
                message
            ]
        }));

    };

    const clearChat = (friendId) => {
        setChatCache((prev) => ({
            ...prev,
            [friendId]: []
        }));
    };

    const sendMessage = () => {
        try {
            if (!selectedFriend) return;
            if (!text.trim()) return;

            const optimisticMessage = {
                _id: Date.now().toString(),
                senderId: currentUserId,
                chat: text,
                time: Date.now(),
                seen: false
            };
            addMessage(selectedFriend.id, optimisticMessage);

            socket.emit("send-message", {
                senderId: currentUserId,
                receiverEmail: selectedFriend.email,
                message: text
            });
            setText("");
        } catch (error) {
            console.log("ERROR in sending message", error.message)
        }
    };

    const receiveMessage = (message) => {
        const friend = selectedFriendRef.current;
        if (!friend) return;
        addMessage(friend.id, message);
    };

    useEffect(() => {
        socket.on("receive-message", receiveMessage);
        return () => {
            socket.off("receive-message", receiveMessage);
        };
    }, []);

    return {
        loading,
        setLoading,
        selectedFriend,
        selectFriend,
        messages,
        sendMessage,
        chatCache,
        setFriendMessages,
        addMessage,
        clearChat,
        setText,
        text,
        currentUserId
    };

};