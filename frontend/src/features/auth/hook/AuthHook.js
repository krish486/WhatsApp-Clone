import { useState } from "react";
import { googleWindowLocation } from "../api/authApi";

export const AuthHook = () => {
    const [loading, setLoading] = useState(false);
    const url = googleWindowLocation();
    const handleGoogleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };

    return { handleGoogleLogin, loading }
}