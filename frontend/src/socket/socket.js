import { io } from "socket.io-client"
import { parentApi } from "../config/parent-api/parentApi"

export const socket = io(parentApi(), {
    withCredentials: true,
    autoConnect: false,
})