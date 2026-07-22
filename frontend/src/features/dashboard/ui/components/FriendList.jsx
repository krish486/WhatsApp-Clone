import React from 'react'
import { useAcceptedRequest } from '../../hook/FriendRequestHooks/acceptedRequestHook';
import { chatPageHook } from '../../hook/FriendChatHook/chatPageHook';
// import { chatPageHook } from '../../hook/FriendChatHook/chatPageHook';

const FriendList = ({ chat }) => {

    const acceptedRequest = useAcceptedRequest();
    const friends = acceptedRequest.acceptedRequest || [];

    const { selectFriend } = chat

    return (
        <section
            className="
                        lg:col-span-2
                        bg-white
                        rounded-2xl
                        shadow-sm
                        overflow-hidden
                        flex
                        flex-col
                    "
        >
            <div
                className="
                            border-b
                            p-4
                            flex
                            items-center
                            justify-between
                        "
            >
                <h2 className="font-semibold text-lg">
                    My Friends
                </h2>

                <span className="text-sm text-gray-500">
                    {friends.length} Friends
                </span>
                <button
                    onClick={acceptedRequest.refetch}
                    disabled={acceptedRequest.loading}
                    className="
                px-4
                py-2
                rounded-lg
                bg-slate-800
                text-white
                hover:bg-slate-700
                disabled:opacity-60
                transition
                cursor-pointer
            "
                >
                    {acceptedRequest.loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">

                {friends.length === 0 ? (

                    <div className="h-full flex items-center justify-center p-8">

                        <div className="text-center max-w-sm">

                            <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-6xl shadow-inner">
                                👥
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-slate-800">
                                No Friends Yet
                            </h2>

                            <p className="mt-2 text-slate-500 leading-relaxed">
                                You haven't connected with anyone yet.
                                Accept a friend request to start chatting.
                            </p>

                        </div>

                    </div>

                ) : (

                    friends.map((friend, prop) => (

                        <div
                            key={prop}
                            className="
        relative
        flex
        items-center
        justify-between
        p-4
        transition
        after:absolute
        after:bottom-0
        after:left-4
        after:right-4
        after:h-px
        after:bg-black
    "
                        >
                            <div className="flex items-center gap-3 min-w-0">

                                <img
                                    src={friend.picture}
                                    alt={friend.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div className="min-w-0">

                                    <h3 className="font-medium truncate">
                                        {friend.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 truncate">
                                        {friend.email}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => {
                                    selectFriend(friend);
                                    acceptedRequest.navigate(`/chat/${friend.id}`);
                                }}
                                className="
                        ml-4
                        shrink-0
                        rounded-xl
                        bg-green-500
                        px-4
                        py-2
                        text-white
                        hover:bg-green-600
                        transition
                        cursor-pointer
                    "
                            >
                                Chat
                            </button>

                        </div>

                    ))

                )}

            </div>

        </section>
    )
}

export default FriendList
