import { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux"
import { noSearch, searchFound, searchNotFound, setSearchEmail, startSearching } from "../../state/friendSearchingSlice";
import { searchFriend } from "../../api/dashboardApi";


export const friendSearchingHook = () => {
    let dispatch = useDispatch()
    const { searchEmail, searchResult, isSearching, notFound } = useSelector((store) => store.friendSearching)
    const handleSearch = async (searchEmail) => {
        if (!searchEmail.trim()) {
            dispatch(noSearch())
            return;
        }

        try {
            dispatch(startSearching())
            const res = await searchFriend(searchEmail);
            if (res) {
                dispatch(searchFound(res))
            } else {
                dispatch(searchNotFound())
            }
        } catch (error) {
            dispatch(searchNotFound())
        }
    };

    const setEmail = (email) => {
        dispatch(setSearchEmail(email))
    }
    const searchNone = () => {
        dispatch(noSearch())
    }
    return { handleSearch, searchEmail, searchResult, isSearching, notFound, setEmail, searchNone }

}