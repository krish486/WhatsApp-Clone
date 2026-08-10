import React from "react";
import { NavLink } from "react-router";
import { logOutHook } from "../../hook/log-out/logOutHook";
import { useSelector } from "react-redux";

const navItemClass = ({ isActive }) =>
    `px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
    ${isActive
        ? "bg-green-500 text-white shadow-md scale-[1.02]"
        : "hover:bg-gray-100 active:scale-95"
    }`;

const mobileNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center transition-all duration-200
    ${isActive
        ? "text-green-600 font-semibold"
        : "text-gray-500 active:scale-95"
    }`;

const SideBar = () => {

    const { chatOpen } = useSelector((store) => store.chatOpen)

    const { handleLogout } = logOutHook()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm flex-col justify-between">
                <div className="p-6">
                    <div className="
    flex
    items-center
    gap-2
    mb-8
    w-fit
    cursor-pointer
    group
">
                        {/* Logo */}
                        <div className="
        w-9
        h-9
        rounded-xl
        bg-green-600
        text-white
        flex
        items-center
        justify-center
        font-bold
        text-lg
        shadow-sm

        transition-all
        duration-300
        ease-out

        group-hover:scale-110
        group-hover:rotate-6
        group-hover:shadow-lg
        group-hover:bg-emerald-500
    ">
                            G
                        </div>

                        {/* Brand */}
                        <h1 className="
        text-2xl
        font-extrabold
        tracking-tight
        text-gray-900

        transition-all
        duration-300
        ease-out

        group-hover:text-green-600
        group-hover:translate-x-1
    ">
                            Gossips
                        </h1>
                    </div>

                    <nav className="flex flex-col gap-4">

                        <NavLink
                            to="/"
                            end
                            className={navItemClass}
                        >
                            💬 Chats
                        </NavLink>

                        <NavLink
                            to="/friend-list"
                            className={navItemClass}
                        >
                            👥 Friends
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={navItemClass}
                        >
                            👤 Profile
                        </NavLink>

                    </nav>
                </div>

                <div className="p-6 border-t">
                    <button
                        onClick={handleLogout}
                        className="
                        w-full cursor-pointer rounded-lg bg-red-500 py-3
                        text-white font-medium transition-all duration-200
                        hover:bg-red-600 active:scale-95
                        "
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navbar */}
            <nav
                className={`
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        shadow-xl
        z-50

        transform
        transition-all
        duration-500
        ease-in-out

        ${chatOpen
                        ? "translate-y-full opacity-0 pointer-events-none"
                        : "translate-y-0 opacity-100"
                    }
    `}
            >
                <div className="grid grid-cols-4 h-16">

                    <NavLink
                        to="/"
                        end
                        className={mobileNavClass}
                    >
                        <span>💬</span>
                        <span className="text-xs">Chats</span>
                    </NavLink>

                    <NavLink
                        to="/friend-list"
                        className={mobileNavClass}
                    >
                        <span>👥</span>
                        <span className="text-xs">Friends</span>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={mobileNavClass}
                    >
                        <span>👤</span>
                        <span className="text-xs">Profile</span>
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center active:scale-95 transition-all duration-200"
                    >
                        <span>🚪</span>
                        <span className="text-xs">Logout</span>
                    </button>

                </div>
            </nav>
        </>
    );
};

export default SideBar;