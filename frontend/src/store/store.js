import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/AuthSlice"
import friendSearchingReducer from "../features/dashboard/state/friendSearchingSlice"
import chatReducer from "../features/dashboard/state/chatSlice"
import metaDataReducer from "../features/dashboard/state/metaDataSlice"
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        friendSearching: friendSearchingReducer,
        chatOpen: chatReducer,
        metaData: metaDataReducer
    }
})