import { io } from "socket.io-client"
import { parentApi } from "../config/parent-api/parentApi"

export const socket = io("https://whatsapp-clone-ipnq.onrender.com", {
    withCredentials: true,
    autoConnect: false,
})