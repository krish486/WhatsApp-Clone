import React, { useState } from "react";
import { searchFriend } from "../../api/dashboardApi";
import { friendSearchingHook } from "../../hook/friendSearchingHook";
import { friendRequestHook } from "../../hook/friendRequestHook";

const FriendListPage = () => {
    const { handleSearch, searchEmail, searchResult, isSearching, notFound, setEmail, searchNone } = friendSearchingHook()
    const { handlePendingRequest, reqStatus } = friendRequestHook()
    const pendingRequests = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: `Request User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
    }));

    const friends = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: `Friend ${i + 1}`,
        email: `friend${i + 1}@gmail.com`,
        online: i % 2 === 0,
    }));


    return (
        <div className="h-[calc(100vh-80px)] md:h-screen bg-slate-100 p-3 md:p-6">

            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Friends
                </h1>
                <p className="text-gray-500 text-sm">
                    Manage friends and requests
                </p>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-green-500
                    "
                    value={searchEmail}
                    onChange={(e) => {
                        setEmail(e.target.value);

                        if (!e.target.value.trim()) {
                            searchNone();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(searchEmail);
                        }
                    }}
                />
                {isSearching && (
                    <div className="bg-white p-4 rounded-xl mb-4">
                        Searching...
                    </div>
                )}

                {searchResult && (
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                        <div className="flex items-center justify-between gap-4">

                            {/* User Info */}
                            <div className="flex items-center gap-3 min-w-0">

                                <img
                                    src={searchResult.picture}
                                    alt={searchResult.name}
                                    className="
                        w-14
                        h-14
                        rounded-full
                        object-cover
                        border
                        shrink-0
                    "
                                />

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg truncate">
                                        {searchResult.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 truncate">
                                        {searchResult.email}
                                    </p>
                                </div>

                            </div>

                            {/* Button */}
                            <button
                                onClick={handlePendingRequest}
                                disabled={searchResult.status === "pending"}
                                className={`
        px-4
        py-2
        rounded-lg
        text-white
        transition
        shrink-0
        font-medium
        cursor-pointer
        ${searchResult.status === "pending"
                                        ? "bg-yellow-500 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                    }
    `}
                            >
                                {searchResult.status === "pending" ? "Request Sent" : "Add Friend"}
                            </button>

                        </div>
                    </div>
                )}

                {notFound && (
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 text-center text-gray-500">
                        Result Not Found
                    </div>
                )}
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-110px)]">

                {/* Requests */}
                <section
                    className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        overflow-hidden
                        flex
                        flex-col
                    "
                >
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-lg">
                            Pending Requests
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">

                        {pendingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="
                                    p-4
                                    border-b
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                                            h-12
                                            w-12
                                            rounded-full
                                            bg-green-500
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-semibold
                                            shrink-0
                                        "
                                    >
                                        {request.name[0]}
                                    </div>

                                    <div className="flex-1 min-w-0">

                                        <h3 className="font-medium truncate">
                                            {request.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 truncate">
                                            {request.email}
                                        </p>

                                        <div className="flex gap-2 mt-3">

                                            <button
                                                className="
                                                    flex-1
                                                    rounded-lg
                                                    bg-green-500
                                                    text-white
                                                    py-2
                                                    hover:bg-green-600
                                                    transition
                                                    cursor-pointer
                                                "
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="
                                                    flex-1
                                                    rounded-lg
                                                    border
                                                    py-2
                                                    hover:bg-gray-100
                                                    transition
                                                    cursor-pointer
                                                "
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </section>

                {/* Friends */}
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
                            p-4
                            border-b
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
                    </div>

                    <div className="flex-1 overflow-y-auto">

                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    p-4
                                    border-b
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                <div className="flex items-center gap-3 min-w-0">

                                    <div className="relative shrink-0">

                                        <div
                                            className="
                                                h-14
                                                w-14
                                                rounded-full
                                                bg-slate-300
                                            "
                                        />

                                        {friend.online && (
                                            <div
                                                className="
                                                    absolute
                                                    bottom-0
                                                    right-0
                                                    h-4
                                                    w-4
                                                    rounded-full
                                                    bg-green-500
                                                    border-2
                                                    border-white
                                                "
                                            />
                                        )}

                                    </div>

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
                        ))}

                    </div>

                </section>

            </div>

        </div>
    );
};

export default FriendListPage;  