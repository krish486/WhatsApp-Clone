import { createSlice } from "@reduxjs/toolkit";


let metaDataSlice = createSlice({
    name: "metaData",
    initialState: {
        unreadCount: 0,
        friendID: null,
    },
    reducers: {
        updateUnreadCount: (state, action) => {
            state.unreadCount = action.payload.unreadCount;
            state.friendID = action.payload.friendID
        }
    }
})

export const { updateUnreadCount } = metaDataSlice.actions

export default metaDataSlice.reducer