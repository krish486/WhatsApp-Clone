import { useEffect, useMemo, useRef, useState } from "react";
import { fetchMessageApi } from "../../api/chatsApi";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../socket/socket";
import { setChatOpen } from "../../state/chatSlice";
import { useLocation, useParams } from "react-router";
import { useAcceptedRequest } from "../FriendRequestHooks/acceptedRequestHook";
import { updateUnreadCount } from "../../state/metaDataSlice";

export const chatPageHook = () => {

    const { pathname } = useLocation()
    const acceptedRequest = useAcceptedRequest();
    const friends = acceptedRequest.acceptedRequest || [];
    const { friendId } = useParams();

    const [unSeenCount, setUnSeenCount] = useState(0)

    const dispatch = useDispatch()

    const { user } = useSelector((store) => store.auth)
    const selectedFriendRef = useRef(null);

    const currentUserId = user.id

    const [selectedFriend, setSelectedFriend] = useState(null);
    // {
    //   friendId: [messages]
    // }
    const updateUnreadCountFn = (friendId, unreadCount) => {
        dispatch(updateUnreadCount({
            friendId,
            unreadCount
        }));
    }

    const hideNav = (val) => {
        dispatch(setChatOpen(val))
    }

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
            updateUnreadCountFn(res.friendId, res.unreadCount)
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

        hideNav(true);

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
    /**
 * Sync selected friend with URL.
 *
 * Example:
 * URL -> /chat/123
 *
 * friendId = "123"
 *      ↓
 * find friend from accepted friends
 *      ↓
 * call selectFriend(friend)
 */
    useEffect(() => {

        if (!friendId) return;

        if (!friends.length) return;

        // Already selected
        if (selectedFriend?.id === friendId) return;

        const friend = friends.find(
            (f) => String(f.id) === String(friendId)
        );

        if (!friend) return;

        selectFriend(friend);

    }, [friendId, friends]);

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
        if (!selectedFriend) return;
        try {
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
        socket.on("unread-count-update", ({ friendId, unreadCount }) => {
            updateUnreadCountFn(friendId, unreadCount)
        });
        return () => {
            socket.off("receive-message", receiveMessage);
            socket.off("UNREAD_COUNT_UPDATED");
        };
    }, []);

    useEffect(() => {

        if (pathname.includes("chat")) {
            updateUnreadCountFn(
                pathname.split("/")[2],
                0
            );
        }

    }, [pathname, messages]);

    return {
        unSeenCount,
        hideNav,
        loading,
        setLoading,
        setSelectedFriend,
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