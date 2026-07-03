import { useMemo, useState } from "react";
import { fetchMessageApi } from "../../api/chatsApi";

export const chatPageHook = () => {

    const [selectedFriend, setSelectedFriend] = useState(null);
    // {
    //   friendId: [messages]
    // }
    const [chatCache, setChatCache] = useState({});
    const [loading, setLoading] = useState(false);
    const messages = useMemo(() => {
        if (!selectedFriend) return [];
        return chatCache[selectedFriend.id] || [];
    }, [selectedFriend, chatCache]);

    const fetchMeesage = async (friendId) => {
        await fetchMessageApi(friendId);
    }

    const selectFriend = (friend) => {
        setSelectedFriend(friend);
        fetchMeesage(friend.id)
    };

    const setFriendMessages = (friendId, chats) => {
        setChatCache((prev) => ({
            ...prev,
            [friendId]: chats
        }));
    };

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

    return {
        loading,
        setLoading,
        selectedFriend,
        selectFriend,
        messages,
        chatCache,
        setFriendMessages,
        addMessage,
        clearChat
    };

};