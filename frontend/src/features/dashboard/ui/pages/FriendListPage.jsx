import React, { useState } from "react";
import { searchFriend } from "../../api/dashboardApi";
import { friendSearchingHook } from "../../hook/friendSearchingHook";
import { friendRequestHook } from "../../hook/friendRequestHook";
import { usePendingRequest } from "../../hook/pendingRequestHook";
import { acceptRejectHook } from "../../hook/acceptRejectHook";
import { useAcceptedRequest } from "../../hook/acceptedRequestHook";

const FriendListPage = () => {
    const { handleSearch, searchEmail, searchResult, isSearching, notFound, setEmail, searchNone } = friendSearchingHook()


    const { handlePendingRequest, reqStatus } = friendRequestHook()

    const {
        pendingRequests,
        loading,
        refetch
    } = usePendingRequest();

    const { handleAcceptBtn, handleRejectBtn } = acceptRejectHook()

    const acceptedRequest = useAcceptedRequest();
    const friends = acceptedRequest.acceptedRequest;


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

                    <div className="flex flex-col h-full">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-3  bg-white sticky top-0 z-10">

                            <div
                                className="
                                w-full
                            p-4
                            flex
                            items-center
                            justify-between
                        "
                            >
                                <h2 className="font-semibold text-lg">
                                    Pending Request - {pendingRequests.length}
                                </h2>

                                <button
                                    onClick={refetch}
                                    disabled={loading}
                                    className="
                px-4
                py-2
                rounded-lg
                bg-slate-800
                text-white
                hover:bg-slate-700
                disabled:opacity-60
                transition
            "
                                >
                                    {loading ? "Refreshing..." : "Refresh"}
                                </button>
                            </div>


                        </div>

                        {/* List */}

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">

                            {pendingRequests.length === 0 ? (

                                <div className="h-full flex flex-col items-center justify-center text-center">

                                    <div className="text-6xl">
                                        📭
                                    </div>

                                    <h2 className="text-xl font-semibold mt-3">
                                        No Pending Requests
                                    </h2>

                                    <p className="text-gray-500">
                                        Looks like nobody wants to bother you today. Temporary miracle.
                                    </p>

                                </div>

                            ) : (

                                pendingRequests.map((request, prop) => (
                                    <div
                                        key={prop}
                                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-4
                        hover:shadow-md
                        transition
                    "
                                    >

                                        <div className="flex gap-4">

                                            <img
                                                src={request.picture}
                                                alt={request.name[0].name}
                                                className="
                        h-14
                                w-14
                                rounded-full
                                flex
                                items-center
                                justify-center
                    "
                                            />

                                            <div className="flex-1">

                                                <h3 className="font-semibold text-lg">
                                                    {request.name}
                                                </h3>

                                                <p className="text-gray-500 text-sm">
                                                    {request.email}
                                                </p>

                                                <div className="flex gap-3 mt-4">

                                                    <button
                                                        onClick={async () => {
                                                            await handleAcceptBtn(request.email)
                                                            refetch()
                                                        }}
                                                        className="
                                        flex-1
                                        py-2
                                        rounded-xl
                                        bg-green-500
                                        hover:bg-green-600
                                        text-white
                                        transition
                                        cursor-pointer
                                    "
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        onClick={async () => {
                                                            await handleRejectBtn(request.email)
                                                            refetch()
                                                        }}
                                                        className="
                                        flex-1
                                        py-2
                                        rounded-xl
                                        border
                                        border-red-300
                                        text-red-600
                                        hover:bg-red-50
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

                                ))

                            )}

                        </div>

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

                                    <button
                                        onClick={acceptedRequest.refetch}
                                        className="mt-6 px-6 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
                                    >
                                        🔄 Refresh
                                    </button>

                                </div>

                            </div>

                        ) : (

                            friends.map((friend) => (

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
                    "
                                    >
                                        Chat
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                </section>

            </div>

        </div>
    );
};

export default FriendListPage;  