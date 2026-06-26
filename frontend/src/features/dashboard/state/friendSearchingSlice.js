import { createSlice } from "@reduxjs/toolkit";


let friendSearchingSlice = createSlice({
    name: "friendSearching",
    initialState: {
        searchEmail: "",
        searchResult: null,
        isSearching: false,
        notFound: false
    },
    reducers: {
        setSearchEmail: (state, action) => {
            state.searchEmail = action.payload
        },
        startSearching: (state) => {
            state.isSearching = true
            state.notFound = false
        },
        noSearch: (state) => {
            state.searchResult = null
            state.notFound = false
            state.isSearching = false
        },
        searchFound: (state, action) => {
            state.searchResult = action.payload
            state.isSearching = false
            state.notFound = false
        },
        searchNotFound: (state) => {
            state.searchResult = null
            state.isSearching = false
            state.notFound = true
        },
        updateRequestStatus: (state, action) => {
            if (state.searchResult) {
                state.searchResult.status = action.payload
            }
        }
    }
})

export const { updateRequestStatus, setSearchEmail, startSearching, noSearch, searchFound, searchNotFound } = friendSearchingSlice.actions

export default friendSearchingSlice.reducer