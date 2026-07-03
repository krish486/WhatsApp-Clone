import { useMemo, useState } from "react";
import { fetchMessageApi } from "../../api/chatsApi";
import { useSelector } from "react-redux";

export const chatPageHook = () => {
    const { user } = useSelector((store) => store.auth)
    const currentUserId = user.id
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
        const res = await fetchMessageApi(friendId);
        return res
    }

    const setFriendMessages = (friendId, chats) => {
        setChatCache((prev) => ({
            ...prev,
            [friendId]: chats
        }));
    };

    const selectFriend = async (friend) => {
        setSelectedFriend(friend);
        const res = await fetchMeesage(friend.id);
        currentUserId === res._id ? setFriendMessages(res?.friendId, res?.chats) : setFriendMessages(res?.userId, res?.chats)
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
        clearChat,
        currentUserId
    };

};