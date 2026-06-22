import { useState } from "react";
import { getMeApi, googleWindowLocation } from "../api/authApi";
import { useDispatch } from "react-redux"
import { addUser } from "../state/AuthSlice";

export const AuthHook = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const url = googleWindowLocation();
    const handleGoogleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    return { handleGoogleLogin, loading }
}