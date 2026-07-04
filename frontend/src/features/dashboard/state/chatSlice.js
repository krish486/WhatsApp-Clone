import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",

    initialState: {
        chatOpen: false,
    },

    reducers: {
        setChatOpen(state, action) {
            state.chatOpen = action.payload;
        },
    },
});

export const {
    setChatOpen,
} = chatSlice.actions;

export default chatSlice.reducer;