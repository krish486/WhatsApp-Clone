import { createSlice } from "@reduxjs/toolkit";


let metaDataSlice = createSlice({
    name: "metaData",
    initialState: {
        unreadCount: 0,
        friendId: null,
    },
    reducers: {
        updateUnreadCount: (state, action) => {
            state.unreadCount = action.payload.unreadCount;
            state.friendId = action.payload.friendId
        }
    }
})

export const { updateUnreadCount } = metaDataSlice.actions

export default metaDataSlice.reducer