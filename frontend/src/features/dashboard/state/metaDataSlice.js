import { createSlice } from "@reduxjs/toolkit";


let metaDataSlice = createSlice({
    name: "metaData",
    initialState: {
        unreadCount: {}
    },
    reducers: {
        updateUnreadCount: (state, action) => {

            const { friendId, unreadCount } = action.payload;

            state.unreadCount[friendId] = unreadCount;

        }
    }
})

export const { updateUnreadCount } = metaDataSlice.actions

export default metaDataSlice.reducer