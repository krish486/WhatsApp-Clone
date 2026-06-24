import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/AuthSlice"
import friendSearchingReducer from "../features/dashboard/state/friendSearchingSlice"
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        friendSearching: friendSearchingReducer
    }
})