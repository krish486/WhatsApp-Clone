import { createSlice } from "@reduxjs/toolkit"


let authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        isAuth: false
    },
    reducers: {
        addUser: (state, action) => {
            console.log("value->", action.payload)
            state.user = action.payload;
            state.isLoading = false;
            state.isAuth = true
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isLoading = false;
        }
    }
})

export const { addUser, removeUser } = authSlice.actions
export default authSlice.reducer