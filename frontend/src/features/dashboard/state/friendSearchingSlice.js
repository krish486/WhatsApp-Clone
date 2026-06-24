import { createSlice } from "@reduxjs/toolkit";


let friendSearchingSlice = createSlice({
    name: "friendSearching",
    initialState: {
        searchResult: null,
        isSearching: true,
        notFound: false
    },
    reducers: {
        noSearch: (state) => {
            state.searchResult = null
            state.notFound = true
            state.isSearching = false
        },
        searchFound: (state, action) => {
            state.searchResult = action.payload
            state.isSearching = false
        },
        searchNotFound: (state) => {
            state.searchResult = null
            state.isSearching = false
            state.notFound = true
        }
    }
})

export const { noSearch, searchFound, searchNotFound } = friendSearchingSlice.actions

export default friendSearchingSlice.reducer