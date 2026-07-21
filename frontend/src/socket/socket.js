import { io } from "socket.io-client"
import { parentApi } from "../config/parent-api/parentApi"

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
})