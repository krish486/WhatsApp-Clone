import { io } from "socket.io-client"
import { parentApi } from "../config/parent-api/parentApi"

export const socket = io("https://whatsapp-clone-ipnq.onrender.com", {
    // export const socket = io("http://localhost:3000", {
    withCredentials: true,
    autoConnect: false,
})