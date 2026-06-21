import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/AuthSlice"
export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})